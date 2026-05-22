const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
{
    goal: {
        type: String,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    calories: {
        type: Number,
        required: true
    },

    protein: {
        type: Number,
        required: true
    },

    carbs: {
        type: Number,
        required: true
    },

    fats: {
        type: Number,
        required: true
    },

    mealPlan: {
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

module.exports = mongoose.model("Diet", dietSchema);