const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
{
    weight: {
        type: Number,
        required: true
    },

    bodyFat: {
        type: Number,
        default: 0
    },

    muscleMass: {
        type: Number,
        default: 0
    },

    notes: {
        type: String,
        default: ""
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

module.exports = mongoose.model("Progress", progressSchema);