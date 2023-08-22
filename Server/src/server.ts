import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import config from "./config"

dotenv.config()
// create out express app
const app: Express = express();
const port = config.server.port

// Handle CORS + middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connectOptions: mongoose.ConnectOptions = {
  dbName: 'todo_Benko_Gellert'
};

async function startServer() {
  try {
    const uri = config.mongoUri as string;
    await mongoose.connect(uri, connectOptions);
    console.log("MongoDB connected");

    app.use(bodyParser.json());

    app.listen(port, () => {
      console.log(`[Server]: I am running at https://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
