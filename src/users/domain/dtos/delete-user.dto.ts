import { isValidUUID } from "../../../helpers";

class DeleteUserDTO {
  constructor( public readonly id: string ) {}

  static delete(props: { [ key: string ]: any }): [string?, DeleteUserDTO?] {
    const { id } = props;

    if (!isValidUUID(id)) {
      return [
        `User id: ${id}, is not valid !`,
        undefined
      ];
    }

    return [
      undefined,
      new DeleteUserDTO(id),
    ];
  }

}

export default DeleteUserDTO;
