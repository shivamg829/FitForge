const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createWorkout,
    getWorkouts,
    deleteWorkout
} = require("../controllers/workoutController");

router.post("/", protect, createWorkout);
router.get("/", protect, getWorkouts);
router.delete("/:id", protect, deleteWorkout);

module.exports = router;