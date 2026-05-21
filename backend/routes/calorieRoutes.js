const express = require("express");
const router = express.Router();
const Calorie = require("../models/Calorie");
const protect = require("../middleware/authMiddleware");

const {
    addCalorie,
    getCalories,
    deleteCalorie
} = require("../controllers/calorieController");

router.post("/", protect, addCalorie);
router.get("/", protect, getCalories);
router.delete("/:id", protect, deleteCalorie);

module.exports = router;