const Diet = require("../models/Diet");

const generateDietPlan = (goal, weight) => {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  let mealPlan = [];
  if (goal === "Muscle Gain") {
    calories = weight * 35;
    protein = weight * 2;
    carbs = weight * 4;
    fats = weight * 1;
    mealPlan = [
      "Breakfast: Oats + Eggs + Banana",
      "Lunch: Rice + Chicken + Salad",
      "Snack: Peanut Butter Sandwich",
      "Dinner: Paneer + Roti + Vegetables",
    ];
  } else if (goal === "Fat Loss") {
    calories = weight * 25;
    protein = weight * 2;
    carbs = weight * 2;
    fats = weight * 0.8;

    mealPlan = [
      "Breakfast: Boiled Eggs + Green Tea",
      "Lunch: Grilled Chicken + Salad",
      "Snack: Fruits + Nuts",
      "Dinner: Soup + Paneer",
    ];
  } else {
    calories = weight * 30;
    protein = weight * 1.5;
    carbs = weight * 3;
    fats = weight * 1;

    mealPlan = [
      "Breakfast: Milk + Oats",
      "Lunch: Rice + Dal + Vegetables",
      "Snack: Dry Fruits",
      "Dinner: Chapati + Paneer",
    ];
  }

  return {
    calories,
    protein,
    carbs,
    fats,
    mealPlan,
  };
};

const createDiet = async (req, res) => {

    try {

        const { goal, weight } = req.body;
        const generatedDiet = generateDietPlan(goal, weight);
        const diet = await Diet.create({
            goal,
            weight,
            calories: generatedDiet.calories,
            protein: generatedDiet.protein,
            carbs: generatedDiet.carbs,
            fats: generatedDiet.fats,
            mealPlan: generatedDiet.mealPlan,

            user: req.user._id
        });

        res.status(201).json({
            message: "Diet plan generated successfully",
            diet
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};
const getDiets = async (req, res) => {

    try {

        const diets = await Diet.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(diets);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteDiet = async (req, res) => {

    try {

        const diet = await Diet.findById(req.params.id);

        if(!diet){

            return res.status(404).json({
                message: "Diet plan not found"
            });
        }
        if(diet.user.toString() !== req.user._id.toString()){

            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await diet.deleteOne();

        res.status(200).json({
            message: "Diet plan deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createDiet,
    getDiets,
    deleteDiet
};