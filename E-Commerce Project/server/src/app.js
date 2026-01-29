const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const { authRouter } = require("./router/auth.js");
const { productRouter } = require("./router/product.js");
const cors = require("cors");
const { AuthMiddleware } = require("./middleware/auth.js");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/products", productRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
