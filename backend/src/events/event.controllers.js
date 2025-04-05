const Event = require("./event.model");

// Admin Password (stored in environment variables)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "secret123";

const addEvent = async (req, res) => {
  console.log("🔹 New Event Data Received:", req.body);

  if (!req.body.password) {
    console.log("❌ Password is missing!");
    return res.status(400).json({ success: false, message: "Password is required!" });
  }

  console.log(`🔑 Received Password: ${req.body.password}`);
  console.log(`🔑 Expected Password: ${process.env.ADMIN_PASSWORD}`);

  if (req.body.password.trim() !== process.env.ADMIN_PASSWORD.trim()) {
    console.log("❌ Invalid Password!");
    return res.status(403).json({ success: false, message: "Invalid admin password!" });
  }

  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    console.log("✅ Event Saved:", newEvent);

    res.json({
      success: true,
      message: "Event added successfully!",
      event: {
        _id: newEvent._id,
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        organizer: newEvent.organizer || "N/A", // Default if missing
       
      },
    });
  } catch (error) {
    console.error("❌ Error saving event:", error);
    res.status(500).json({ success: false, message: "Error saving event", error });
  }
};



// ✅ Fetch Events Function
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } }); // Fetch only upcoming events
    console.log("✅ Events Fetched from DB:", events);
    res.json({ success: true, events });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ success: false, message: "Error fetching events", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const password = req.query.password; // Read password from query params

    console.log("Received Password:", password);
    console.log("Expected Password:", ADMIN_PASSWORD);

    if (!password || password.trim() !== ADMIN_PASSWORD.trim()) {
      return res.status(403).json({ success: false, message: "Incorrect Admin Password" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    await Event.findByIdAndDelete(id);
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


module.exports = { addEvent, getEvents, deleteEvent };
