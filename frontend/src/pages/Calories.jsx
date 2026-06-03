import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import {
  Flame,
  Utensils,
  Plus,
  Trash2,
  Coffee,
  Salad,
  Moon,
  Apple,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";

const Calories = () => {
  const [foodName, setFoodName] = useState("");
  const [calorieValue, setCalorieValue] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCalories = async () => {
    try {
      const res = await API.get("/calories");
      setEntries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalories();
  }, []);

  const addMeal = async (e) => {
    e.preventDefault();

    if (!foodName || !calorieValue) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      await API.post("/calories", {
        foodName,
        calories: Number(calorieValue),
        mealType,
      });

      setFoodName("");
      setCalorieValue("");
      setMealType("Breakfast");

      fetchCalories();
    } catch (error) {
      console.log(error);
      alert("Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/calories/${id}`);

      setEntries((prev) => prev.filter((meal) => meal._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalCalories = useMemo(
    () => entries.reduce((total, item) => total + Number(item.calories), 0),
    [entries],
  );

  const averageCalories = useMemo(() => {
    if (entries.length === 0) return 0;

    return Math.round(totalCalories / entries.length);
  }, [entries, totalCalories]);

  const highestMeal = useMemo(() => {
    if (entries.length === 0) return 0;

    return Math.max(...entries.map((item) => Number(item.calories)));
  }, [entries]);

  const breakfastCalories = entries
    .filter((item) => item.mealType === "Breakfast")
    .reduce((sum, item) => sum + item.calories, 0);

  const lunchCalories = entries
    .filter((item) => item.mealType === "Lunch")
    .reduce((sum, item) => sum + item.calories, 0);

  const dinnerCalories = entries
    .filter((item) => item.mealType === "Dinner")
    .reduce((sum, item) => sum + item.calories, 0);

  const snacksCalories = entries
    .filter((item) => item.mealType === "Snacks")
    .reduce((sum, item) => sum + item.calories, 0);

  const getMealIcon = (type) => {
    switch (type) {
      case "Breakfast":
        return <Coffee size={18} />;
      case "Lunch":
        return <Salad size={18} />;
      case "Dinner":
        return <Moon size={18} />;
      case "Snacks":
        return <Apple size={18} />;
      default:
        return <Utensils size={18} />;
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 p-6 md:p-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-lime-500/20 bg-linear-to-r from-lime-500/20 to-transparent backdrop-blur-xl p-8 md:p-10 mb-8">
            <h1 className="text-5xl font-extrabold text-lime-400">
              Calorie Tracker
            </h1>

            <p className="mt-4 text-zinc-300 text-lg">
              Track meals, monitor calorie intake, and stay consistent with your
              fitness goals.
            </p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-lime-400" />
              <h2 className="text-2xl font-bold">Add New Meal</h2>
            </div>

            <form onSubmit={addMeal} className="grid md:grid-cols-4 gap-5">
              <input
                type="text"
                placeholder="Food Name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-lime-400"
              />

              <input
                type="number"
                placeholder="Calories"
                value={calorieValue}
                onChange={(e) => setCalorieValue(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-lime-400"
              />

              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-lime-400"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snacks</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-lime-400 text-black font-bold rounded-xl hover:bg-lime-300 transition"
              >
                {loading ? "Adding..." : "Add Meal"}
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
              <Flame className="text-lime-400 mb-4" />
              <p className="text-zinc-400">Total Calories</p>
              <h2 className="text-4xl font-bold mt-2">{totalCalories}</h2>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
              <Utensils className="text-lime-400 mb-4" />
              <p className="text-zinc-400">Meals Logged</p>
              <h2 className="text-4xl font-bold mt-2">{entries.length}</h2>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
              <Target className="text-lime-400 mb-4" />
              <p className="text-zinc-400">Highest Meal</p>
              <h2 className="text-4xl font-bold mt-2">{highestMeal}</h2>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
              <BarChart3 className="text-lime-400 mb-4" />
              <p className="text-zinc-400">Average Calories</p>
              <h2 className="text-4xl font-bold mt-2">{averageCalories}</h2>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-lime-400" />
              <h2 className="text-2xl font-bold">Meal Breakdown</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <div className="bg-zinc-800/70 rounded-2xl p-5">
                <Coffee className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Breakfast</p>
                <h3 className="text-3xl font-bold">{breakfastCalories}</h3>
              </div>

              <div className="bg-zinc-800/70 rounded-2xl p-5">
                <Salad className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Lunch</p>
                <h3 className="text-3xl font-bold">{lunchCalories}</h3>
              </div>

              <div className="bg-zinc-800/70 rounded-2xl p-5">
                <Moon className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Dinner</p>
                <h3 className="text-3xl font-bold">{dinnerCalories}</h3>
              </div>

              <div className="bg-zinc-800/70 rounded-2xl p-5">
                <Apple className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Snacks</p>
                <h3 className="text-3xl font-bold">{snacksCalories}</h3>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-lime-400" />
              <h2 className="text-2xl font-bold">Meal History</h2>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-16">
                <Utensils size={60} className="mx-auto text-zinc-600 mb-4" />

                <h3 className="text-2xl font-bold mb-2">No Meals Logged</h3>

                <p className="text-zinc-400">
                  Start tracking your nutrition today.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {entries.map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-zinc-800/70 border border-zinc-700 rounded-2xl p-6 hover:border-lime-400 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-lime-400 mb-2">
                          {getMealIcon(meal.mealType)}
                          <span className="font-semibold">{meal.mealType}</span>
                        </div>

                        <h3 className="text-2xl font-bold">{meal.foodName}</h3>

                        <p className="text-3xl font-bold text-lime-400 mt-3">
                          {meal.calories} kcal
                        </p>

                        <p className="text-zinc-500 text-sm mt-4">
                          {new Date(meal.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteMeal(meal._id)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calories;
