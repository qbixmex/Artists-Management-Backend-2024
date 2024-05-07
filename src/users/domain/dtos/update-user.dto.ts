import { isPasswordSecure, isValidUUID } from '../../../helpers';
import { Role } from '../entities';

class UpdateUserDTO {
  constructor(
    public readonly id: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly role?: string,
    public readonly active?: boolean,
  ) {}

  get values() {
    const outputObject: { [ key: string ]: any } = {};

    if (this.firstName) {
      outputObject.firstName = this.firstName;
    }

    if (this.lastName) {
      outputObject.lastName = this.lastName;
    }

    if (this.email) {
      outputObject.email = this.email;
    }

    if (this.password) {
      outputObject.password = this.password;
    }

    if (this.role) {
      outputObject.role = this.role;
    }

    if (this.active) {
      outputObject.active = this.active;
    }

    return outputObject;
  }

  static update(props: { [ key: string ]: any }): [string?, UpdateUserDTO?] {
    const { id, firstName, lastName, email, password, role, active } = props;

    if (!isValidUUID(id)) {
      return [
        `User id: ${id}, is not valid id !`,
        undefined
      ];
    }

    if (firstName && typeof firstName !== 'string') {
      return [
        'First Name must be a valid string !',
        undefined
      ];
    }

    if (firstName && firstName.length < 3) {
      return [
        'First Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (lastName && typeof lastName !== 'string') {
      return [
        'Last Name must be a valid string !',
        undefined
      ];
    }

    if (lastName && lastName.length < 3) {
      return [
        'Last Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (email && typeof email !== 'string') {
      return [
        'Email must be a valid string !',
        undefined
      ];
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return [
        'Email is not a valid format !',
        undefined
      ];
    }

    if (password && typeof password !== 'string') {
      return [
        'Email must be a valid string !',
        undefined
      ];
    }

    if (password && password.length < 6) {
      return [
        'Password must be greater than 8 characters !',
        undefined
      ];
    }

    if (password && isPasswordSecure(password)) {
      return [
        'Password is very insecure, choose another more safety !',
        undefined
      ];
    }

    if (role && typeof email !== 'string') {
      return [
        'Role must be a valid string !',
        undefined
      ];
    }

    if ( role && !Object.values(Role).includes(role)) {
      return [
        'Is not valid role !',
        undefined
      ];
    }

    if (active && typeof active !== 'boolean') {
      return [
        'Active must be a boolean value !',
        undefined
      ];
    }

    return [
      undefined,
      new UpdateUserDTO(id, firstName, lastName, email, password, role, active),
    ];
  }

}

export default UpdateUserDTO;
