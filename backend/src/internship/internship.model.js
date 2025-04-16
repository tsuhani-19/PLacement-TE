const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const Internship = mongoose.model("Internship", internshipSchema);


const removePastInternships = async () => {
  try {
    await Internship.deleteMany({ endDate: { $lt: new Date() } });
    console.log("✅ Removed past internships from the database.");
  } catch (error) {
    console.error("❌ Error removing past internships:", error);
  }
};


removePastInternships();
module.exports = mongoose.model("Internship", internshipSchema);