import mongoose, { Model, Schema } from 'mongoose';
import { FullName, OnlineStores, SocialMedia, Streaming } from '../types';

export type ArtistType = {
  uuid: string;
  fullName: FullName;
  artistName: string;
  slug: string;
  artistPhoto: string;
  visible?: boolean;
  pictures?: string[];
  location?: string;
  biography?: string;
  genres?: string[];
  labels?: string[];
  socialMedia?: SocialMedia;
  onlineStores?: OnlineStores;
  streaming?: Streaming;
};

type timestamps = {
  createdAt: string;
  updatedAt: string;
};

export type ArtistModel = Model<ArtistType & timestamps>;

const ArtistSchema = new Schema<ArtistType, ArtistModel>(
  {
    uuid: {
      type: String,
      required: [true, "UUID is required !"],
      unique: true,
    },
    fullName: {
      type: {
        value: {
          type: String,
          required: [true, "Full name is required !"],
        },
        visible: {
          type: Boolean,
          default: false,
        },
      },
      required: [true, "Full name is required !"],
    },
    artistName: {
      type: String,
      required: [true, "Artist name is required !"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required !"],
      unique: true,
    },
    artistPhoto: {
      type: String,
      required: [true, "Artist photo is required !"],
      unique: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    pictures: [String],
    location: String,
    biography: String,
    genres: [String],
    labels: [String],
    socialMedia: {
      type: [
        {
          url: {
            type: String,
            required: [true, "Social media URL is required !"],
          },
          visible: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    onlineStores: {
      type: [
        {
          url: {
            type: String,
            required: [true, "Online store URL is required !"],
          },
          visible: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    streaming: {
      type: [
        {
          url: {
            type: String,
            required: [true, "Online store URL is required !"],
          },
          visible: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

ArtistSchema.set("toJSON", {
  virtuals: true, //? convert _id to id
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

const Artist = mongoose.model<ArtistType, ArtistModel>("Artist", ArtistSchema);

export default Artist;
