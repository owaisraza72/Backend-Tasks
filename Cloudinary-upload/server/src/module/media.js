const mongoose = require("mongoose");


const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // Cloudinary ka secure URL
    mediaUrl: {
      type: String,
      required: true,
    },

    // image ya video
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
  },
  {
    collection: "cloudinaryUrlMedia", // MongoDB collection name
    timestamps: true, // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("Media", mediaSchema);
