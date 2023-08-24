import { config } from "dotenv";

config({
  path: "./.env",
});

export default {
  server: {
    port: process.env.PORT,
  },
  mongoUri: process.env.MONGO_URI,
};
