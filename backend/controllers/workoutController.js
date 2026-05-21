const Workout = require("../models/Workout");

const generateWorkoutPlan = (goal, experience, daysPerWeek) => {
    let plan = [];
    if(goal === "Muscle Gain"){

        if(daysPerWeek === 3){

            plan = [
                "Chest + Triceps",
                "Back + Biceps",
                "Legs + Shoulders"
            ];
        }

        else if(daysPerWeek === 5){

            plan = [
                "Chest + Triceps",
                "Back + Biceps",
                "Legs",
                "Shoulders",
                "Full Body"
            ];
        }

        else{

            plan = [
                "Push",
                "Pull",
                "Legs"
            ];
        }
    }
    else if(goal === "Fat Loss"){

        plan = [
            "HIIT Cardio",
            "Upper Body",
            "Lower Body",
            "Core + Cardio"
        ];
    }
    else{

        plan = [
            "Full Body",
            "Cardio",
            "Strength Training"
        ];
    }

    return plan;
};

const createWorkout = async (req, res) => {

    try {
        const { goal, experience, daysPerWeek } = req.body;
        const generatedPlan = generateWorkoutPlan(
            goal,
            experience,
            daysPerWeek
        );

        // Save in DB
        const workout = await Workout.create({
            goal,
            experience,
            daysPerWeek,
            plan: generatedPlan,

            user: req.user._id
        });

        res.status(201).json({
            message: "Workout plan generated successfully",
            workout
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};
const getWorkouts = async (req, res) => {

    try {

        const workouts = await Workout.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(workouts);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteWorkout = async (req, res) => {

    try {

        const workout = await Workout.findById(req.params.id);

        if(!workout){

            return res.status(404).json({
                message: "Workout plan not found"
            });
        }

        // Ownership check
        if(workout.user.toString() !== req.user._id.toString()){

            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await workout.deleteOne();

        res.status(200).json({
            message: "Workout plan deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout
};