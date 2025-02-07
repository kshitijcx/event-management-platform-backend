import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const app = express();

app.use(express.json())
app.use("/api/users",userRoutes)

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("db connected");
  app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
