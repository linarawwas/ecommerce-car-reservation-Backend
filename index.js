import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import contactRoute from "./routes/contactRoute.js";
import bodyParser from 'body-parser'

dotenv.config();

const port = process.env.PORT || 5000;

await db();

const app = new express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/contact", contactRoute)

app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});
