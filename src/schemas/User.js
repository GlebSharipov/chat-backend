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
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
