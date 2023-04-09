import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import carsRoute from "./routes/carsRoute.js";
import cors from 'cors';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to database
await db();

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.use("/api/cars", carsRoute);

// Set up error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});