const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      minLegnth: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name must be at most 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,

      // 8 characters
      // 1 uppercase letter
      // 1 lowercase letter
      // 1 Number
      // 1 special character

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      lowercase: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender must be male, female or other");
        }
      },
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
      max: [65, "Age must be at most 65"],
    },
    about: {
      type: String,
      trim: true,
      lowercase: true,
      minLegnth: 10,
      maxlength: 100,
      default: "This is About field !",
    },
    skills: {
      type: [String],
      validate(value) {
        // if (value.length < 2) {
        //   throw new Error("Skills must be at least 2 skills is required");
        // }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.example.com/default-photo.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
