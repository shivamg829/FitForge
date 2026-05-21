const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
{
    goal: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },

    daysPerWeek: {
        type: Number,
        required: true
    },

    plan: {
        type: [String],
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Workout", workoutSchema);