const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createDiet,
    getDiets,
    deleteDiet
} = require("../controllers/dietController");

router.post("/", protect, createDiet);
router.get("/", protect, getDiets);
router.delete("/:id", protect, deleteDiet);

module.exports = router;