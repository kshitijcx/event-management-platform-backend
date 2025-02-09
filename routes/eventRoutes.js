import express from "express";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getOne,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/:id", getOne);
router.post("/add", addEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
