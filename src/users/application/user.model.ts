import mongoose, { Model, Schema } from "mongoose";

export type UserType = {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "manager" | "booker" | "promoter" | "artist" | "subscriber";
  active?: boolean;
  password: string;
  imageURL?: string;
};

type timestamps = {
  createdAt: string;
  updatedAt: string;
};

export type UserModel = Model<UserType & timestamps>;

const UserSchema = new Schema<UserType, UserModel>(
  {
    uuid: {
      type: String,
      required: [true, "UUID is required !"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required !"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required !"],
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Role is required !"],
      enum: ["admin", "manager", "booker", "promoter", "artist", "subscriber"]
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
      default: [true, "Image is required !"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true, //? convert _id to id
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password; //? hide password from the response
  },
});

const User = mongoose.model<UserType, UserModel>("User", UserSchema);

export default User;
