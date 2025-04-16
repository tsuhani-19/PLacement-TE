const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB is successfully connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop server if MongoDB fails
  }
}

connectDB();

// Routes
const authRoutes = require("./src/users/user.route");
// In your main server file (index.js)
const eventRoutes = require("./src/events/event.routes");
app.use("/api/events", eventRoutes); // This should match your frontend calls
// ✅ Import Event Routes

app.use("/api/auth", authRoutes);
// ✅ Use Event Routes
const internshipRoutes = require("./src/internship/internship.routes");
app.use("/api/internships", internshipRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Debug route registration
console.log("🔄 Registered Routes:");
app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(`${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path}`);
  } else if (layer.name === 'router') {
    layer.handle.stack.forEach((sublayer) => {
      console.log(`${Object.keys(sublayer.route.methods)[0].toUpperCase()} ${layer.regexp.source.replace('^\\', '').replace('\\/?$', '')}${sublayer.route.path}`);
    });
  }
});
// Start Server **only if MongoDB is connected**
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
