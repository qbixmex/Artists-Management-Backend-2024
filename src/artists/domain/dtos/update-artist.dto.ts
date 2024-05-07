import { isValidUUID } from '../../../helpers';
import { FullName } from '../../types';

class UpdateArtistDTO {
  constructor(
    public readonly id: string,
    public readonly fullName?: FullName,
    public readonly artistName?: string,
    public readonly slug?: string,
    public readonly artistPhoto?: string,
    public readonly visible?: boolean,
    public readonly pictures?: string[],
    public readonly location?: string,
    public readonly biography?: string,
    public readonly labels?: string,
    public readonly genres?: string,
    public readonly socialMedia?: string,
    public readonly onlineStores?: string,
    public readonly streaming?: string,
  ) {}

  static update(props: { [ key: string ]: any }): [string?, UpdateArtistDTO?] {

    if (!isValidUUID(props.id)) {
      return [
        `Artist id: ${props.id}, is not valid id !`,
        undefined
      ];
    }

    if (props.fullName && typeof props.fullName.value !== 'string') {
      return [
        'Full name value must be a valid string !',
        undefined
      ];
    }

    if (props.fullName && typeof props.fullName.visible !== 'boolean') {
      return [
        'Full name visible must be a valid boolean !',
        undefined
      ];
    }

    if (props.fullName && props.fullName.length < 4) {
      return [
        'Full name must be greater than 3 characters !',
        undefined
      ];
    }

    if (props.artistName && typeof props.artistName !== 'string') {
      return [
        'Artist name must be a valid string !',
        undefined
      ];
    }

    if (props.artistName && props.artistName.length < 4) {
      return [
        'Artist name must be greater than 3 characters !',
        undefined
      ];
    }

    if (props.artistPhoto && typeof props.artistPhoto !== 'string') {
      return [
        'Artist photo url must be a valid string !',
        undefined
      ];
    }

    if (props.artistPhoto && !props.artistPhoto.startsWith('https://')){
      return [
        'Artist photo url must start with: https:\/\/ !',
        undefined
      ];
    }

    if (props.slug && typeof props.slug !== 'string') {
      return [
        'Artist slug must be a valid string !',
        undefined
      ];
    }

    if (props.slug && props.slug.length < 4) {
      return [
        'Artist slug must be greater than 3 characters !',
        undefined
      ];
    }

    if (props.visible && typeof props.visible !== 'boolean') {
      return [
        'Artist visibility must be a valid boolean !',
        undefined
      ];
    }

    if (
      props.pictures && !Array.isArray(props.pictures)
      || props.pictures && props.pictures.some((picture: any) => typeof picture !== 'string')
    ) {
      return [
        'Pictures must be an string array !',
        undefined
      ];
    }

    if (props.pictures && props.pictures.length === 0) {
      return [
        'Pictures array cannot be empty !',
        undefined
      ];
    }

    if (props.location && typeof props.location !== 'string') {
      return [
        'Artist location must be a valid string !',
        undefined
      ];
    }

    if (props.location && props.location.length < 4) {
      return [
        'Artist location must be greater than 3 characters ! !',
        undefined
      ];
    }

    if (props.biography && typeof props.biography !== 'string') {
      return [
        'Artist biography must be a valid string !',
        undefined
      ];
    }

    if (props.biography && props.biography.length < 9) {
      return [
        'Artist biography must be greater than 8 characters ! !',
        undefined
      ];
    }

    if (
      props.labels && !Array.isArray(props.labels)
      || props.pictures && props.labels.some((label: any) => typeof label !== 'string')
    ) {
      return [
        'Labels must be an string array !',
        undefined
      ];
    }

    if (props.labels && props.labels.length === 0) {
      return [
        'Labels array cannot be empty !',
        undefined
      ];
    }

    if (
      props.genres && !Array.isArray(props.genres)
      || props.genres && props.genres.some((genre: any) => typeof genre !== 'string')
    ) {
      return [
        'Genres must be an string array !',
        undefined
      ];
    }

    if (props.genres && props.genres.length === 0) {
      return [
        'Genres array cannot be empty !',
        undefined
      ];
    }

    if (
      props.socialMedia && !Array.isArray(props.socialMedia)
      || props.pictures && props.socialMedia.some((item: any) => {
        return (typeof item !== 'object') || (typeof item.url !== 'string') || (typeof item.visible !== 'boolean');
      })
    ) {
      return [
        'Social media must be an object array and url must be string and visible boolean !',
        undefined
      ];
    }

    if (
      props.onlineStores && !Array.isArray(props.onlineStores)
      || props.pictures && props.onlineStores.some((item: any) => {
        return (typeof item !== 'object') || (typeof item.url !== 'string') || (typeof item.visible !== 'boolean');
      })
    ) {
      return [
        'Online stores must be an object array and url must be string and visible boolean !',
        undefined
      ];
    }

    if (
      props.streaming && !Array.isArray(props.streaming)
      || props.pictures && props.streaming.some((item: any) => {
        return (typeof item !== 'object') || (typeof item.url !== 'string') || (typeof item.visible !== 'boolean');
      })
    ) {
      return [
        'Streaming must be an object array and url must be string and visible boolean !',
        undefined
      ];
    }

    return [
      undefined,
      new UpdateArtistDTO(
        props.id,
        props.fullName,
        props.artistName,
        props.slug,
        props.artistPhoto,
        props.visible,
        props.pictures,
        props.location,
        props.biography,
        props.labels,
        props.genres,
        props.socialMedia,
        props.onlineStores,
        props.streaming,
      ),
    ];
  }

}

export default UpdateArtistDTO;
