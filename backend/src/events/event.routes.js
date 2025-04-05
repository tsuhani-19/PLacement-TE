const express = require("express");
const router = express.Router();
const eventControllers = require("./event.controllers"); // Ensure this file exists and is correctly imported

// Check if the functions exist
if (!eventControllers.addEvent || !eventControllers.getEvents || !eventControllers.deleteEvent) {
  console.error("❌ ERROR: Event controller functions are missing!");
}

// Use correct function names
router.post("/addEvent", eventControllers.addEvent);
router.get("/events", eventControllers.getEvents);
router.delete("/deleteEvent/:id", eventControllers.deleteEvent);

module.exports = router;
