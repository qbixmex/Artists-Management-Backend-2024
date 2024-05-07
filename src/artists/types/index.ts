import { ArtistEntity } from '../domain';

export type FullName = {
  value: string;
  visible: boolean;
};

export type SocialMedia = {
  name?: 'facebook' | 'instagram' | 'twitter_x' | 'tiktok';
  other?: string;
  url: string;
  visible: boolean;
}[];

export type OnlineStores = {
  name?: 'beatport' | 'traxsource' | 'i_tunes' | 'amazon_music' | 'apple_music';
  other?: string;
  url: string;
  visible: boolean;
}[];

export type Streaming = {
  name?: 'spotify' | 'deezer' | 'apple_music' | 'tidal' | 'amazon_music';
  other?: string;
  url: string;
  visible: boolean;
}[];

export type QueryParams = {
  order: string;
  orderBy: 'fullName' | 'artistName' | 'visible';
  limit: number;
  page: number;
};

export type GetAllResponse = {
  total: number;
  artists: ArtistEntity[];
};

export type RequestBodyCreate = {
  uuid: string;
  fullName: string;
  artistName: string;
  artistPhoto: string;
};

// export type RequestUpdate = {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   password?: string;
//   active?: boolean;
//   role?: string;
// };
