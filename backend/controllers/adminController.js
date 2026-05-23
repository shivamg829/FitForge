const User = require("../models/User");
const Calorie = require("../models/Calorie");
const Workout = require("../models/Workout");
const Diet = require("../models/Diet");
const Progress = require("../models/Progress");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCalories = await Calorie.countDocuments();

    const totalWorkouts = await Workout.countDocuments();

    const totalDiets = await Diet.countDocuments();

    const totalProgress = await Progress.countDocuments();

    res.status(200).json({
      totalUsers,

      totalCalories,

      totalWorkouts,

      totalDiets,

      totalProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    getAllUsers,
    getDashboardStats,
    deleteUser
};