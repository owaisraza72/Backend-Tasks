const express = require("express");
const { User } = require("../model/auth");
const bcrypt = require("bcrypt");
const { validateLogin, validateSignup } = require("../lib/utils");

const { AuthMiddleware } = require("../middleware/auth"); // Ensure this path is correct relative to auth.js

const authRouter = express.Router();

authRouter.get("/me", AuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching user", error: error.message });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    // STEP 1: Validation

    validateSignup(req);

    const { name, email, password, age, gender } = req.body;

    // STEP 2: Check if user already exists

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists with this email");
    }

    // STEP 3: Hash Password

    const hashpassword = await bcrypt.hash(password, 10);

    // STEP 4: Create User
    const newUser = await User({
      name,
      email,
      password: hashpassword,
      age,
      gender,
    });

    await newUser.save();

    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).send({ message: "BAD REQUEST", error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // STEP 1: Validate the incoming data
    validateLogin(req);

    // STEP 2: Check if the user exists in the database

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatch = await user.validatePassword(password);

    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT Token (Optional)

    const token = await user.getJwt();

    console.log("Generated Token :", token);

    // STEP 3: Set cookie and respond

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
    });

    res
      .status(200)
      .json({ message: "User logged in successfully", data: user });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now() * 0),
    });

    res.json("Logout Successfully !");
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
});

module.exports = {
  authRouter,
};
