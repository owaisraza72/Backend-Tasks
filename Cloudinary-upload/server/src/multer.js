const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB (video ke liye thora zyada)
  fileFilter: (req, file, cb) => {
     const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/jfif",       // 🔥 ADD THIS
    "video/mp4",
    "video/mkv",
    "video/webm",
    "video/quicktime",
  ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image (jpg, png, webp) and video (mp4, mkv, webm, mov) files are allowed"
        )
      );
    }
  },
});

module.exports = upload;
