import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      minLength: 8,
      require: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
