import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, errors, json, printf } = format;

// Custom console format for development
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Daily rotate file transport
const fileTransport = new transports.DailyRotateFile({
  filename: "logs/%DATE%-app.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  level: "info",
});

// Create logger
const logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: "ecommerce-api" },
  transports: [
    new transports.Console({
      format: combine(timestamp(), errors({ stack: true }), devFormat),
    }),
    fileTransport,
  ],
});

export default logger;