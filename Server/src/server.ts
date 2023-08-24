import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config";
import router from "./routes/index";
import bodyParser from "body-parser";

dotenv.config();
// create out express app
const app: Express = express();
const port = config.server.port;

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

//URLencode
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//Routers
app.use("/", router);

const connectOptions: mongoose.ConnectOptions = {
  dbName: "todo_Benko_Gellert",
};

async function startServer() {
  try {
    const uri = config.mongoUri as string;
    await mongoose.connect(uri, connectOptions);
    console.log("MongoDB connected");

    // app.use(bodyParser.json());

    app.listen(port, () => {
      console.log(`[Server]: I am running at https://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
