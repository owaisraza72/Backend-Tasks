const express = require("express");
const cors = require("cors");
const mediaRoutes = require("./routes/mediaRoutes");
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", mediaRoutes);


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


