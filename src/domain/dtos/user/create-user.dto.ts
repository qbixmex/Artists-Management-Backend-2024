import { Role } from "../../entities";

class CreateUserDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: Role,
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateUserDTO?] {
    const { firstName, lastName, email, role } = props;

    if (!firstName) {
      return [
        'First Name is required !',
        undefined
      ];
    }

    if (firstName.length < 3) {
      return [
        'First Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (!lastName) {
      return [
        'Last Name is required !',
        undefined
      ];
    }

    if (lastName.length < 3) {
      return [
        'Last Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (!email) {
      return [
        'Email is required !',
        undefined
      ];
    }

    if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ) {
      return [
        'Email is not a valid format !',
        undefined
      ];
    }

    if ( !role ) {
      return [
        'Role is required !',
        undefined
      ];
    }

    if ( !Object.values(Role).includes(role)) {
      return [
        'Is not valid role !',
        undefined
      ];
    }

    return [
      undefined,
      new CreateUserDTO(
        firstName,
        lastName,
        email,
        role
      ),
    ];
  }
}

export default CreateUserDTO;