const Calorie = require("../models/Calorie");

const addCalorie = async (req, res) => {

    try {

        const { foodName, calories, mealType } = req.body;

        const calorieEntry = await Calorie.create({

            foodName,
            calories,
            mealType,

            user: req.user._id
        });

        res.status(201).json({
            message: "Meal added successfully",
            calorieEntry
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

const getCalories = async (req, res) => {

    try {

        const calories = await Calorie.find({
            user: req.user._id
        });

        res.status(200).json(calories);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteCalorie = async (req, res) => {

    try {

        const calorie = await Calorie.findById(req.params.id);

        if(!calorie){

            return res.status(404).json({
                message: "Meal not found"
            });
        }

        if(calorie.user.toString() !== req.user._id.toString()){

            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await calorie.deleteOne();

        res.status(200).json({
            message: "Meal deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addCalorie,
    getCalories,
    deleteCalorie
};