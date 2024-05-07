import { createSlug } from "../../../helpers";
import { FullName } from "../../types";

type Props = {
  uuid: string;
  fullName: FullName;
  artistName: string;
  artistPhoto: string;
};

class CreateArtistDTO {

  constructor(
    public readonly uuid: string,
    public readonly fullName: FullName,
    public readonly artistName: string,
    public readonly slug: string,
    public readonly artistPhoto: string,
  ) {}

  static create(props: Props): [string?, CreateArtistDTO?] {
    if (!props.uuid) {
      return [
        'UUID is required !',
        undefined
      ];
    }

    if (!props.fullName.value) {
      return [
        'Artist full name is required !',
        undefined
      ];
    }

    if (typeof props.fullName.value !== 'string') {
      return [
        'Artist full name must be string type !',
        undefined
      ];
    }
    
    if (props.fullName.value.length < 4) {
      return [
        'Artist full name must be greater than 4 characters !',
        undefined
      ];
    }

    if (typeof props.fullName.visible !== 'boolean') {
      return [
        'Artist full name visible must be boolean type !',
        undefined
      ];
    }

    if (!props.artistName) {
      return [
        'Artist Name is required !',
        undefined
      ];
    }

    if (typeof props.artistName !== 'string') {
      return [
        'Artist Name must be string type !',
        undefined
      ];
    }

    if (props.artistName.length < 3) {
      return [
        'Artist Name must be greater than 3 characters !',
        undefined
      ];
    }

    const slug = createSlug(props.artistName);

    if (!props.artistPhoto) {
      return [
        'Artist photo url is required !',
        undefined
      ];
    }

    if (typeof props.artistPhoto !== 'string') {
      return [
        'Artist photo must be string type !',
        undefined
      ];
    }

    if (!props.artistPhoto.startsWith('https://')){
      return [
        'Artist photo url must start with: https:\/\/ !',
        undefined
      ];
    }

    return [
      undefined,
      new CreateArtistDTO(
        props.uuid,
        props.fullName,
        props.artistName,
        slug,
        props.artistPhoto,
      ),
    ];
  }
}

export default CreateArtistDTO;