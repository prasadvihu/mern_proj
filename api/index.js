import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo DB connected"));

app.listen(3000, () => console.log("Server is listening...!!!"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
