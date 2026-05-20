const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    weight: {
        type: Number
    },

    height: {
        type: Number
    },

    goal: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);