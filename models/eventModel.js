import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  attendees: Number,
  attendeesLimit: Number,
  userId: String,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
