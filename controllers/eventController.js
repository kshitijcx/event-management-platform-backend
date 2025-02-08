import Event from "../models/eventModel.js";

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: "Error Occured", error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
  } catch (error) {
    // res.status.()
  }
};

const addEvent = async (req, res) => {
  try {
    const data = req.body;
    // data.attendeesLimit = Number(data.attendeesLimit);
    // data.date = new Date(data.date);
    console.log(data)
    const event = new Event(data);
    await event.save();
    res.status(201).json({ message: "Event Added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    if (userId !== id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error Occured", error: error.message });
  }
};

const deleteEvent = async (req, res) => {};

export { getAllEvents, addEvent, updateEvent, deleteEvent };
