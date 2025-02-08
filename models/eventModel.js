import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  attendeesLimit: Number,
  userId: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
