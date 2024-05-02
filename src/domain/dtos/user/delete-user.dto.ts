// import { validate as uuidValidate } from 'uuid';

class DeleteTodoDTO {
  constructor( public readonly id: string ) {}

  static delete(props: { [ key: string ]: any }): [string?, DeleteTodoDTO?] {
    const { id } = props;

    // if (!uuidValidate(id)) {
    //   return [
    //     `Todo id: ${id}, is not valid uuid !`,
    //     undefined
    //   ];
    // }

    return [
      undefined,
      new DeleteTodoDTO(id),
    ];
  }

}

export default DeleteTodoDTO;
