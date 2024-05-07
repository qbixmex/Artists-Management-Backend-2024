import { FullName, OnlineStores, SocialMedia, Streaming } from "../../types";

type EntityTypes =
  | string
  | string[]
  | boolean
  | undefined
  | Date
  | FullName
  | SocialMedia
  | OnlineStores
  | Streaming;

class ArtistEntity {
  constructor(
    public readonly id: string,
    public readonly fullName: FullName,
    public readonly artistName: string,
    public readonly slug: string,
    public readonly artistPhoto: string,
    public readonly visible: boolean,
    public readonly pictures?: string[],
    public readonly location?: string,
    public readonly biography?: string,
    public readonly genres?: string[],
    public readonly labels?: string[],
    public readonly socialMedia?: SocialMedia,
    public readonly onlineStores?: OnlineStores,
    public readonly streaming?: Streaming,
  ) {}

  public static fromObject(entity: { [key: string]: EntityTypes }): ArtistEntity {
    if (!entity.id) {
      throw 'ID entity is required !';
    }

    if (!entity.fullName) {
      throw 'Full Name entity is required !';
    }

    if (!entity.artistName) {
      throw 'Artist Name entity is required !';
    }

    if (!entity.slug) {
      throw 'Slug entity is required !';
    }

    return new ArtistEntity(
      entity.id as string,
      entity.fullName as FullName,
      entity.artistName as string,
      entity.slug as string,
      entity.artistPhoto as string,
      entity.visible as boolean,
      entity.pictures as string[],
      entity.location as string,
      entity.biography as string,
      entity.genres as string[],
      entity.labels as string[],
      entity.socialMedia as SocialMedia,
      entity.onlineStores as OnlineStores,
      entity.streaming as Streaming,
    );
  }
}

export default ArtistEntity;
