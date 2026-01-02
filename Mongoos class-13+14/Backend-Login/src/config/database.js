const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DbUserName}:${process.env.DbPassword}@cluster.2bm3fhl.mongodb.net/${process.env.DbName}`
    );
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Error connecting to database ❌:", error.message);
    throw error; // 🔥 THIS WAS MISSING
  }
};

module.exports = connectDB;
