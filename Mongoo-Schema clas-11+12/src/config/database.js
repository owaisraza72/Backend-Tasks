const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://owaisraza:mongodb123@cluster.2bm3fhl.mongodb.net/smitBackend"
  );
};

module.exports = {
  connectDB,
};
