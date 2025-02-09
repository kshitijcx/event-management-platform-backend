import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cors from "cors";
import Event from "./models/eventModel.js";

import { Server } from "socket.io";
import _ from "lodash";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("db connected");
});

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const debounceUpdateAttendeeCount = _.debounce(async (eventId, inc) => {
  try {
    let event = await Event.findById(eventId);
    if (inc && event.attendees < event.attendeesLimit) {
      event.attendees += 1;
    } else if (!inc && event.attendees > 0) {
      event.attendees -= 1;
    }  
    await event.save();

    console.log(`updated count`);

    io.emit("attendeeCountUpdated");

  } catch (error) {
    console.log("Error", error);
  }
}, 500);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("inc", (eventId) => {
    debounceUpdateAttendeeCount(eventId, true);
  });

  socket.on("dec", (eventId) => {
    debounceUpdateAttendeeCount(eventId, false);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
