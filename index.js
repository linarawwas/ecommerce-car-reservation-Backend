import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import reservationRoute from './routes/reservationRoute.js'
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js';


dotenv.config();
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
