import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
require("dotenv").config();

// create out express app
const app: Express = express();
const port = 3000;

// Handle CORS + middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  ); // If using .fetch and not axios
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// database stuff
const uri = process.env.MONGO_URI as string;
console.log(uri);
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
