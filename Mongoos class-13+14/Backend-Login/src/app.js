const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./module/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

// new class kya krata h 4 kaam krta h
// 1. constructor function call krna
// 2. values properties ko retun krna 
// 3. 

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Database Configuration Service is running.");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // await for DB response
    res.status(200).json(users); // send proper JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    //    Step 1

    if (!name) {
      throw new Error("Name is required");
    } else if (!validator.isEmail(email)) {
      throw new Error("Invalid Email Address");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    // Step 2

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    await user.save();

    res.json({ message: "User registered successfully !", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    } else if (!validator.isEmail(email)) {
      throw new Error("Invalid Email Address or Password");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Invalid Email Address or Password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }

    res.json({ message: "User logged in successfully !", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// bcript password kko incript krke hashpassword  mein store krta h or incript mien saltround 10 use krta h use krna k lya phelia const bcrypt = require("bcrypt"); krte hen0
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });
