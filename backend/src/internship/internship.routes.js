const express = require("express");
const { addInternship, getInternships, deleteInternship } = require("./internship.controller");

const router = express.Router();

router.post("/add", addInternship);
router.get("/", getInternships);
router.delete("/:id", deleteInternship);

module.exports = router; // ✅ Ensure this exports only the router
