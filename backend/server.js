require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());
console.log("✅ Server running on port:", process.env.PORT);
console.log("🔑 Admin Password:", process.env.ADMIN_PASSWORD);

if (!process.env.ADMIN_PASSWORD) console.warn("⚠️ ADMIN_PASSWORD is missing!");
if (!process.env.DB_URI) {
  console.error("❌ DB_URI is missing! Server cannot connect to MongoDB.");
  process.exit(1);
}


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


const eventRoutes = require("./src/events/event.routes");
app.use("/api/events", eventRoutes);

const authRoutes = require("./src/users/user.route");
app.use("/api/auth", authRoutes);

const internshipRoutes = require("./src/internship/internship.routes"); // ✅ Corrected Import
app.use("/api/internships", internshipRoutes); // ✅ Corrected Usage

// ✅ Auto-delete past events at midnight
const Event = require("./src/events/event.model");
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Event.deleteMany({ date: { $lt: new Date() } });
    console.log(`🗑️ Deleted ${result.deletedCount} past events`);
  } catch (error) {
    console.error("❌ Error deleting past events:", error);
  }
});
console.log("🔄 Auto-delete job for events scheduled: Runs at midnight daily.");

// ✅ Auto-delete past internships at midnight (✅ Fixed field name)
const Internship = require("./src/internship/internship.model");
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Internship.deleteMany({ endDate: { $lt: new Date() } }); // ✅ Fixed field
    console.log(`🗑️ Deleted ${result.deletedCount} past internships`);
  } catch (error) {
    console.error("❌ Error deleting past internships:", error);
  }
});
console.log("🔄 Auto-delete job for internships scheduled: Runs at midnight daily.");


console.log(
  "🔍 Loaded Routes:",
  app._router.stack.map((r) => r.route && r.route.path).filter(Boolean)
);


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));