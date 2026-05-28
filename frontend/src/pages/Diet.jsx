import { useState } from "react";

const dietPlans = {
  muscleGain: {
    title: "Muscle Gain Diet 💪",

    meals: [
      {
        meal: "Breakfast",
        food: "Oats + Banana + Peanut Butter + Milk",
        protein: 25,
        carbs: 60,
        fats: 15,
      },

      {
        meal: "Lunch",
        food: "Chicken Breast + Rice + Vegetables",
        protein: 40,
        carbs: 70,
        fats: 10,
      },

      {
        meal: "Dinner",
        food: "Eggs + Sweet Potato + Salad",
        protein: 35,
        carbs: 45,
        fats: 12,
      },
    ],
  },

  weightLoss: {
    title: "Weight Loss Diet 🔥",

    meals: [
      {
        meal: "Breakfast",
        food: "Oats + Apple + Green Tea",
        protein: 15,
        carbs: 35,
        fats: 5,
      },

      {
        meal: "Lunch",
        food: "Grilled Chicken + Salad",
        protein: 35,
        carbs: 20,
        fats: 8,
      },

      {
        meal: "Dinner",
        food: "Soup + Boiled Eggs",
        protein: 25,
        carbs: 15,
        fats: 6,
      },
    ],
  },
};

const Diet = () => {
  const [goal, setGoal] = useState("muscleGain");

  const [water, setWater] = useState(0);

  const [height, setHeight] = useState("");

  const [weight, setWeight] = useState("");

  const currentPlan = dietPlans[goal];

  // BMI CALCULATION

  const calculateBMI = () => {
    if (!height || !weight) {
      return 0;
    }

    const heightInMeters = height / 100;

    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI();

  // TOTAL MACROS

  const totalProtein = currentPlan.meals.reduce(
    (acc, item) => acc + item.protein,
    0,
  );

  const totalCarbs = currentPlan.meals.reduce(
    (acc, item) => acc + item.carbs,
    0,
  );

  const totalFats = currentPlan.meals.reduce((acc, item) => acc + item.fats, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-10">Diet Planner 🥗</h1>

      {/* GOAL SELECTOR */}

      <div className="flex justify-center mb-10">
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="border p-3 rounded-lg shadow-md"
        >
          <option value="muscleGain">Muscle Gain</option>

          <option value="weightLoss">Weight Loss</option>
        </select>
      </div>

      {/* TITLE */}

      <h2 className="text-3xl font-semibold text-center mb-10">
        {currentPlan.title}
      </h2>

      {/* MACROS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">Protein</h2>

          <p className="text-3xl font-bold mt-3">{totalProtein}g</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">Carbs</h2>

          <p className="text-3xl font-bold mt-3">{totalCarbs}g</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">Fats</h2>

          <p className="text-3xl font-bold mt-3">{totalFats}g</p>
        </div>
      </div>

      {/* MEAL CARDS */}

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {currentPlan.meals.map((meal, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-bold">{meal.meal}</h2>

            <p className="mt-4 text-gray-700">{meal.food}</p>

            <div className="mt-5 space-y-2">
              <p>💪 Protein: {meal.protein}g</p>

              <p>🍚 Carbs: {meal.carbs}g</p>

              <p>🥑 Fats: {meal.fats}g</p>
            </div>
          </div>
        ))}
      </div>

      {/* WATER TRACKER */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6">Water Intake 💧</h2>

        <p className="text-xl mb-5">{water} Glasses</p>

        <div className="flex gap-4">
          <button
            onClick={() => setWater(water + 1)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg"
          >
            Add Water
          </button>

          <button
            onClick={() => setWater(0)}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* BMI CALCULATOR */}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">BMI Calculator ⚖️</h2>

        <div className="flex flex-col md:flex-row gap-5">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Your BMI: {bmi}</h3>
        </div>
      </div>
    </div>
  );
};

export default Diet;
