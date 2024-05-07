import { encryptAdapter } from '../../../adapters';
import { UserDataSource } from '../../domain/data-source';
import { CreateUserDTO, UpdateUserDTO } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../../common/errors';
import { isValidUUID } from '../../../helpers';
import { User } from '../../application';
import { GetAllResponse, QueryParams } from '../../types';

class MongoDataSourceImplementation implements UserDataSource {

  async getAll(queryParams: QueryParams): Promise<GetAllResponse> {

    const [total, users] = await Promise.all([
      User.countDocuments(),
      User.find()
        .sort({ [queryParams.orderBy]: (queryParams.order === 'asc') ? 1 : -1 })
        .limit(queryParams.limit)
        .skip((queryParams.page - 1) * (queryParams?.limit))
    ]);

    if (users.length === 0) {
      return {
        total: 0,
        users: [],
      };
    }

    return {
      total,
      users: users.map((user) => UserEntity.fromObject({
        id: user.uuid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        active: user.active,
        imageURL: user.imageURL,
      }))
    };
  }

  async getById(id: string): Promise<UserEntity> {
    if (!isValidUUID(id)) {
      throw new CustomError(`Invalid id: ${id} !`, 400);
    }

    const user = await User.findOne({ uuid: id });

    if (!user) {
      throw new CustomError(`User with id: ${id}, not found !`, 404);
    }

    return UserEntity.fromObject({
      id: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      active: user.active,
      imageURL: user.imageURL,
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError(`User with email: ${email}, not found !`, 404);
    }

    return UserEntity.fromObject({
      id: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      active: user.active,
      imageURL: user.imageURL,
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const userExists = await User.findOne({ email: createUserDTO.email });

    if (userExists) {
      throw new CustomError(`User with email: ${createUserDTO.email}, already exists !`, 400);
    }

    const hashedPassword = encryptAdapter.hash(createUserDTO.password);

    try {
      const newUser = await User.create({
        ...createUserDTO,
        password: hashedPassword,
      });

      return UserEntity.fromObject({
        id: newUser.uuid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        active: newUser.active,
        imageURL: newUser.imageURL,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async update(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    let passwordsMatch = true;

    if (!isValidUUID(updateUserDTO.id)) {
      throw new CustomError(`Invalid id: ${updateUserDTO.id} !`, 400);
    }

    const foundUser = await User.findOne({ uuid: updateUserDTO.id });

    if (!foundUser) {
      throw new CustomError(`User with id: ${updateUserDTO.id}, not found !`, 404);
    }

    if (updateUserDTO.password) {
      passwordsMatch = encryptAdapter.compare(updateUserDTO.password, foundUser.password);
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { uuid: updateUserDTO.id },
        {
          ...updateUserDTO,
          password: passwordsMatch
            ? undefined
            : encryptAdapter.hash(updateUserDTO.password!)
        },
        { new: true }
      );

      return UserEntity.fromObject({
        id: updatedUser!.uuid,
        firstName: updatedUser!.firstName,
        lastName: updatedUser!.lastName,
        email: updatedUser!.email,
        role: updatedUser!.role,
        active: updatedUser!.active,
        imageURL: updatedUser!.imageURL
      });

    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

  async delete(id: string): Promise<UserEntity> {

    const userExists = await User.findOne({ uuid: id });

    if (!userExists) {
      throw new CustomError(`User with id: ${id}, not found !`, 400);
    }

    try {
      const deletedUser = await User.findOneAndDelete({ uuid: id });
      return UserEntity.fromObject(deletedUser!);
    } catch (error) {
      console.log(error);
      throw new CustomError("Unexpected error, check logs for details !", 500);
    }
  }

}

export default MongoDataSourceImplementation;