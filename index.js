import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import bodyParser from 'body-parser'
import reservationRoute from './routes/reservationRoute.js'
import cors from 'cors';
import morgan from 'morgan';


dotenv.config();
await db();

const PORT = process.env.PORT || 5000;



const app = new express();

app.use(express.json());
app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/Reservations', reservationRoute);


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))
