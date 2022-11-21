const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: "Email is required",
      validate: [isEmail, "Invalid email"],
    },

    userName: {
      type: String,
      require: "Name is required",
    },

    password: {
      type: String,
      require: "Password is required",
    },

    token: { type: String },

    confirmed: {
      type: Boolean,
      default: false,
    },

    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },

  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
