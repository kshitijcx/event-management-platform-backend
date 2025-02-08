import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("db connected");
  app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
