import { isValidUUID } from "../../../helpers";

class DeleteArtistDTO {
  constructor( public readonly id: string ) {}

  static run(id: string): [string?, DeleteArtistDTO?] {

    if (!isValidUUID(id)) {
      return [
        `Artist id: ${id}, is not valid !`,
        undefined
      ];
    }

    return [
      undefined,
      new DeleteArtistDTO(id),
    ];

  }

}

export default DeleteArtistDTO;
