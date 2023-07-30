import { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
    },
    countrie: {
      type: String,
    },
    avathar: {
      type: String,
    },
    acceptTerms: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
