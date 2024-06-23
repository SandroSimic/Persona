import multer from "multer";
import AppError from "./appError.js";
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
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
});

export const compressImage = async (req, res, next) => {
  if (!req.file || !req.file.buffer) return next();

  sharp(req.file.buffer)
    .resize({ fit: "inside", width: 500, height: 500 })
    .toBuffer()
    .then((data) => {
      req.file.buffer = data;
      next();
    })
    .catch((err) => {
      return next(new AppError("Error compressing image", 400));
    });
};

