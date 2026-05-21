const mongoose = require("mongoose");

const calorieSchema = new mongoose.Schema(
{
    foodName: {
        type: String,
        required: true
    },

    calories: {
        type: Number,
        required: true
    },

    mealType: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
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

module.exports = mongoose.model("Calorie", calorieSchema);