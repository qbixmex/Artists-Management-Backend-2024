import { UserDataSource } from "../../domain/data-source";
import { UpdateUserDTO } from "../../domain/dtos";
import CreateUserDTO from "../../domain/dtos/user/create-user.dto";
import { Role, UserEntity } from "../../domain/entities";

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

  list(): Promise<UserEntity[]> {
    const users = data.map(user => UserEntity.fromObject(user));
    return new Promise((resolve) => {
      setTimeout(() => resolve(users), 1000);
    });
  }

  show(id: string): Promise<UserEntity> {
    const user = UserEntity.fromObject(data[0]);
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), 1000);
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(UserEntity.fromObject({
          id: "123abc",
          ...createUserDTO,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
      }, 1000);
    });
  }

  update(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    const foundUser = data.find(item => item.id === updateUserDTO.id);

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(UserEntity.fromObject({
          id: foundUser!.id,
          firstName: updateUserDTO.firstName ?? foundUser?.firstName,
          lastName: updateUserDTO.lastName ?? foundUser?.lastName,
          email: updateUserDTO.email ?? foundUser?.email,
          active: updateUserDTO.active ?? foundUser?.active,
          role: updateUserDTO.role ?? foundUser?.role,
          updatedAt: new Date().toISOString(),
        }));
      }, 1000);
    });
  }

  delete(id: string): Promise<UserEntity> {
    const foundUser = data.find(item => item.id === id);
    const user = UserEntity.fromObject(foundUser!);
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), 1000);
    });
  }

}

export default UserDataSourceImplementation;