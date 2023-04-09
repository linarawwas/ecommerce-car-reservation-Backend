import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import bodyParser from 'body-parser';

import contactRoute from './routes/contactRoute.js';


dotenv.config();

const app = new express();

await db();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/api/contact', contactRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});