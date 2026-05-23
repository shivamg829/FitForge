const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addProgress,
    getProgress,
    getAnalytics,
    deleteProgress
} = require("../controllers/progressController");

router.post("/", protect, addProgress);
router.get("/", protect, getProgress);
router.get("/analytics", protect, getAnalytics);
router.delete("/:id", protect, deleteProgress);

module.exports = router;