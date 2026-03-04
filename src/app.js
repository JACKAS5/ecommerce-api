import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { corsMiddleware } from "./config/cors.js";
import v1Router from "./api/v1/routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import helmet from "helmet";
import logger from "./config/logger.js";

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(corsMiddleware);

// JSON body parser
app.use(express.json());

// HTTP request logging
if (process.env.NODE_ENV === "production") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
} else {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1", v1Router);

// Error handling
app.use(errorHandler);

export default app;