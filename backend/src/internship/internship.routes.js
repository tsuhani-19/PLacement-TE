const express = require("express");
const router = express.Router();
const { addInternship, getInternships, deleteInternship } = require("./internship.controller");

// Keep your exact endpoint paths
router.post("/add", addInternship);  // This matches your frontend call
router.get("/", getInternships);
router.delete("/:id", deleteInternship);

module.exports = router;