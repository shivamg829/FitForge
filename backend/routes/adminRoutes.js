const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getDashboardStats,
    deleteUser
} = require("../controllers/adminController");

router.get(
    "/users",
    protect,
    adminMiddleware,
    getAllUsers
);
router.get(
    "/stats",
    protect,
    adminMiddleware,
    getDashboardStats
);
router.delete(
    "/users/:id",
    protect,
    adminMiddleware,
    deleteUser
);

module.exports = router;