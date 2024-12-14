import multer from "multer";
import AppError from "../utils/appError.js";
import sharp from "sharp";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 5000000 },
});


export const uploadMultiple = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 5000000 },
}).array("images", 6);


export const compressImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files to compress");
    return next();
  }

  try {
    console.log("Starting image compression...");
    req.files = await Promise.all(
      req.files.map(async (file) => {
        console.log(`Compressing file: ${file.originalname}`);
        const compressedBuffer = await sharp(file.buffer)
          .resize({ fit: "inside", width: 500, height: 500 })
          .toBuffer();
        console.log(`Compression complete: ${file.originalname}`);
        return { ...file, buffer: compressedBuffer }; // Replace buffer with compressed data
      })
    );
    console.log("All images compressed successfully");
    next();
  } catch (err) {
    console.error("IMAGE COMPRESSION ERROR", err);
    next(new AppError("Image compression failed", 500));
  }
};
