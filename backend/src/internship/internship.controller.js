const Internship = require("./internship.model");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "secret123";

const addInternship = async (req, res) => {
  console.log("🔹 New Internship Data Received:", req.body);

  if (!req.body.password) {
    return res.status(400).json({ success: false, message: "Password is required!" });
  }

  if (req.body.password.trim() !== ADMIN_PASSWORD.trim()) {
    return res.status(403).json({ success: false, message: "Invalid admin password!" });
  }

  try {
    const newInternship = new Internship(req.body);
    await newInternship.save();
    res.json({ success: true, message: "Internship added successfully!", internship: newInternship });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving internship", error });
  }
};

const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ endDate: { $gte: new Date() } });
    res.json({ success: true, internships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching internships", error });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body || {};

    if (!password || password.trim() !== ADMIN_PASSWORD.trim()) {
      return res.status(403).json({ success: false, message: "Incorrect Admin Password" });
    }

    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({ success: false, message: "Internship not found" });
    }

    await Internship.findByIdAndDelete(id);
    res.json({ success: true, message: "Internship deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ Use ESM export
module.exports = { addInternship, getInternships, deleteInternship };