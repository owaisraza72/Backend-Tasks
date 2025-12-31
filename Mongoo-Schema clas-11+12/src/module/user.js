const mongoose = require("mongoose");
const { Schema } = mongoose;

// const person = {
//   name: "owais",
//   age: 21,
//   country: "pakistan",

//   greeting() {
//     return `hello my name is ${this.name}`;
//   },
// };

// console.log("Outer ---> ", person.greeting());

// class User {
//   name;
//   age;
//   country;

//   constructor(name, age, country) {
//     (this.name = name), (this.age = age), (this.country = country);
//   }

//   greeting() {
//     console.log(`Hello ${this.name} welcome to our application`);
//   }
// }
// const user = new User("owais",21,"pakistan")
// const user1 = new User('Ali', 'ali@gmail.com', 'ali321');

// // 4 Pillars (P-I-A-E)

// // Polymorphism , Inheritance, Abstraction, Encapsulation

// user.greeting()

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
      min: 18,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 8,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      }
      // enum: ["male", "female", "other"],
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
    },
  },
  {
    collection: "mongoosShema",
  }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
