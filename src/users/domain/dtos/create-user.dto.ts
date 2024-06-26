import { isPasswordSecure } from '../../../helpers';
import { Role } from '../entities';

type Props = {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  imageURL: string;
};

class CreateUserDTO {

  constructor(
    public readonly uuid: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
    public readonly imageURL: string,
  ) {}

  static create(props: Props): [string?, CreateUserDTO?] {
    if (!props.uuid) {
      return [
        'UUID is required !',
        undefined
      ];
    }

    if (!props.firstName) {
      return [
        'First Name is required !',
        undefined
      ];
    }

    if (props.firstName.length < 3) {
      return [
        'First Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (!props.lastName) {
      return [
        'Last Name is required !',
        undefined
      ];
    }

    if (props.lastName.length < 3) {
      return [
        'Last Name must be greater than 3 characters !',
        undefined
      ];
    }

    if (!props.email) {
      return [
        'Email is required !',
        undefined
      ];
    }

    if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email) ) {
      return [
        'Email is not a valid format !',
        undefined
      ];
    }

    if ( !props.password ) {
      return [
        'Password is required !',
        undefined
      ];
    }

    if ( props.password.length < 6 ) {
      return [
        'Password must be greater than 8 characters !',
        undefined
      ];
    }

    if (props.password && isPasswordSecure(props.password)) {
      return [
        'Password is very insecure, choose another more safety !',
        undefined
      ];
    }

    if ( !props.role ) {
      return [
        'Role is required !',
        undefined
      ];
    }

    if ( !props.imageURL ) {
      return [
        'Image URL is required !',
        undefined
      ];
    }

    if ( !/^https:\/\/.*/.test(props.imageURL) ) {
      return [
        'Image URL must begin with https:\/\/ !',
        undefined
      ];
    }

    if ( !Object.values(Role).includes(props.role)) {
      return [
        'Is not valid role !',
        undefined
      ];
    }

    return [
      undefined,
      new CreateUserDTO(
        props.uuid,
        props.firstName,
        props.lastName,
        props.email,
        props.password,
        props.role,
        props.imageURL,
      ),
    ];
  }
}

export default CreateUserDTO;