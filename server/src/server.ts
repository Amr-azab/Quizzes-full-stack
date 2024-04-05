import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

const port = 8000;
dotenv.config();
const mongoDB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(mongoDB)
  .then(() => console.log("DB connection successfull !"));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
