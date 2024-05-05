import { isDate } from "util/types";

export enum Role {
  ADMIN      = 'admin',
  MANAGER    = 'manager',
  BOOKER     = 'booker',
  PROMOTER   = 'promoter',
  ARTIST     = 'artist',
  SUBSCRIBER = 'subscriber',
}

class UserEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly active: Date | boolean,
    public readonly imageURL: string,
  ) {}

  get isActive(): Date | boolean {
    return isDate(this.active) ? this.active : false;
  }

  public static fromObject(entity: { [key: string]: any }): UserEntity {
    if (!entity.id) {
      throw 'ID is Required !';
    }

    if (!entity.firstName) {
      throw 'First Name is Required !';
    }

    if (!entity.lastName) {
      throw 'Last Name is Required !';
    }

    if (!entity.email) {
      throw 'Email is Required !';
    }

    if (!entity.role) {
      throw 'Role is Required !';
    }

    if (!entity.imageURL) {
      throw 'Image URL is Required !';
    }

    return new UserEntity(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email,
      entity.role,
      entity.active ? entity.active as Date : false,
      entity.imageURL,
    );
  }
}

export default UserEntity;
