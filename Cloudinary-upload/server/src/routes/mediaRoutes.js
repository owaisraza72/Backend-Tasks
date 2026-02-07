const express = require("express");
const upload = require("../multer");
const Media = require("../module/media");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const router = express.Router();

/*
  POST /upload
  - file frontend se aati hai
  - Cloudinary pe upload hoti hai
  - uska URL MongoDB me save hota hai
*/
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { name, description } = req.body;

    // file check
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Cloudinary upload
    const result = await uploadToCloudinary(req.file.buffer);

    // MongoDB me data save
    const media = await Media.create({
      name,
      description,
      mediaUrl: result.secure_url,
      mediaType: result.resource_type, // image | video
    });

    res.status(201).json({
      message: "Media uploaded & saved",
      media,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
  GET /media
  - MongoDB se latest media fetch
*/
router.get("/media", async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 }).limit(10);

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
