import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // Log the error
  logger.error(err);

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
};