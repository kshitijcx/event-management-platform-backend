import express from "express";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.post("/add", addEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
