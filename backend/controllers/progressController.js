const Progress = require("../models/Progress");

const addProgress = async (req, res) => {
  try {
    const { weight, bodyFat, muscleMass, notes } = req.body;

    const progress = await Progress.create({
      weight,
      bodyFat,
      muscleMass,
      notes,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Progress added successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
    }).sort({ createdAt: 1 });

    if (progress.length === 0) {
      return res.status(404).json({
        message: "No progress data found",
      });
    }

    const firstWeight = progress[0].weight;
    const latestWeight = progress[progress.length - 1].weight;
    const weightDifference = latestWeight - firstWeight;

    res.status(200).json({
      startingWeight: firstWeight,
      currentWeight: latestWeight,
      weightChange: weightDifference,
      totalEntries: progress.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        message: "Progress entry not found",
      });
    }
    
    if (progress.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await progress.deleteOne();

    res.status(200).json({
      message: "Progress deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProgress,
  getProgress,
  getAnalytics,
  deleteProgress,
};