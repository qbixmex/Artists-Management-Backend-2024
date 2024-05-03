import { UserDataSource } from "../../domain/data-source";
import { UpdateUserDTO } from "../../domain/dtos";
import CreateUserDTO from "../../domain/dtos/user/create-user.dto";
import { Role, UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import User from "../../presentation/users/user.model";
import { isValidObjectId } from "mongoose";

const data = [
  {
    id: "123abc",
    firstName: "Michael",
    lastName: "Smith",
    email: "michael@gmail.com",
    role: Role.ARTIST,
    active: false,
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    
  },
  {
    id: "456efg",
    firstName: "John",
    lastName: "Mayer",
    email: "johh@gmail.com",
    role: Role.MANAGER,
    active: "2022-02-02T00:00:00.000Z",
    createdAt: "2022-02-01T00:00:00.000Z",
    updatedAt: "2022-02-01T00:00:01.000Z",
  },
];

class UserDataSourceImplementation implements UserDataSource {

  async list(): Promise<UserEntity[]> {

    const users = await User.find();

    if (users.length === 0) {
      return [];
    }

    return users.map((user) => UserEntity.fromObject(user));
  }

  async show(id: string): Promise<UserEntity> {
    if (!isValidObjectId(id)) {
      throw new CustomError(`Invalid id: ${id} !`, 400);
    }

    const user = await User.findById(id);

    if (!user) {
      throw new CustomError(`User with id: ${id}, not found !`, 404);
    }

    return UserEntity.fromObject(user);
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const userExists = await User.findOne({ email: createUserDTO.email });

    if (userExists) {
      throw new CustomError(`User with email: ${createUserDTO.email}, already exists !`, 400);
    }

    try {
      const user = await User.create(createUserDTO);
      return UserEntity.fromObject(user);
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    if (!isValidObjectId(updateUserDTO.id)) {
      throw new CustomError(`Invalid id: ${updateUserDTO.id} !`, 400);
    }

    const foundUser = await User.findById(updateUserDTO.id);

    if (!foundUser) {
      throw new CustomError(`User with id: ${updateUserDTO.id}, not found !`, 404);
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: updateUserDTO.id },
        { ...updateUserDTO },
        { new: true }
      );

      return UserEntity.fromObject({
        id: updatedUser?._id,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        email: updatedUser?.email,
        role: updatedUser?.role,
        active: updatedUser?.active,
        imageURL: updatedUser?.imageURL,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      });

    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async delete(id: string): Promise<UserEntity> {

    if (!isValidObjectId(id)) {
      throw new CustomError(`Invalid id: ${id} !`, 400);
    }

    const userExists = await User.findById(id);

    if (!userExists) {
      throw new CustomError(`User with id: ${id}, not found !`, 400);
    }

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return UserEntity.fromObject(deletedUser!);
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

}

export default UserDataSourceImplementation;