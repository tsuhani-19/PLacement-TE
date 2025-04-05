const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date, // Ensure date is stored as Date type
  organizer: String, // Organizer is optional
});

const Event = mongoose.model("Event", eventSchema);

// Function to remove past events
const removePastEvents = async () => {
  try {
    await Event.deleteMany({ date: { $lt: new Date() } });
    console.log("✅ Removed past events from the database.");
  } catch (error) {
    console.error("❌ Error removing past events:", error);
  }
};

// Run cleanup on server start
removePastEvents();

module.exports = Event;
