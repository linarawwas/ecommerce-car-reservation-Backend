import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
<<<<<<< HEAD
import reservationRoute from './routes/reservationRoute.js'
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js';

=======
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import carsRoute from "./routes/carsRoute.js";
import cors from 'cors';
>>>>>>> 2d0f0f929b7bd79ff1ee459e06086a15080f510a

// Load environment variables
dotenv.config();
<<<<<<< HEAD
await db();
const app = new express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api/user', userRoute);
app.use('/api/Reservations', reservationRoute);


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))


app.listen(PORT, () => {
  console.log(`API IS RUNNING ON PORT: ${PORT}`);
});
=======

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
>>>>>>> 2d0f0f929b7bd79ff1ee459e06086a15080f510a
