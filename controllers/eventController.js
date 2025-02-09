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
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
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
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body);
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event Updated" });
  } catch (error) {
    res.status(400).json({ message: "Error Occured", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { userId, postUserId } = req.body;
    const { id } = req.params;
    if (userId !== postUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllEvents, getOne, addEvent, updateEvent, deleteEvent };
