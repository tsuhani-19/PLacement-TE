const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  about: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Internship', internshipSchema);