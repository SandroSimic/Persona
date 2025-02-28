import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log("VALIDATION ERROR", err);
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data: ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const quoteRegex = /"(.*?)"/;
  const match = err.message.match(quoteRegex);
  const extractedValue = match ? match[1] : "unknown value";

  const message = `Duplicate value ${extractedValue}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
};

const sendErrorProd = (err, _, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  } else {
    if (err.message) {
      return res.status(400).json({
        status: "error",
        message: err.message,
        error: err,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went very wrong",
      });
    }
  }
};

export default (err, req, res, _) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    console.log("error prod", error);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    sendErrorProd(error, req, res);
  }
};
