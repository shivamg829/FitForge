import { useEffect, useState } from "react";
import API from "../services/api";
import IMG from "../IMG/Progress.avif";
import {
  Utensils,
  Target,
  Weight,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Trash2,
  Plus,
  Calendar,
  ClipboardList,
} from "lucide-react";

const Diet = () => {
  const [goal, setGoal] = useState("Muscle Gain");
  const [weight, setWeight] = useState("");
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDiets = async () => {
    try {
      const res = await API.get("/diet");
      setDiets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  const generateDiet = async () => {
    if (!weight) {
      return alert("Please enter your weight");
    }

    try {
      setLoading(true);

      await API.post("/diet", {
        goal,
        weight,
      });

      setWeight("");
      fetchDiets();
    } catch (error) {
      console.log(error);
      alert("Failed to generate diet plan");
    } finally {
      setLoading(false);
    }
  };

  const deleteDiet = async (id) => {
    try {
      await API.delete(`/diet/${id}`);

      setDiets((prev) => prev.filter((diet) => diet._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const latestDiet = diets.length > 0 ? diets[0] : null;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${IMG})`,
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
              Diet Planner
            </h1>

            <p className="mt-4 text-zinc-300 text-lg">
              Generate personalized nutrition plans based on your fitness goal.
            </p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-lime-400" />
              <h2 className="text-2xl font-bold">Generate Diet Plan</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-zinc-400 mb-2">Fitness Goal</label>

                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:border-lime-400 focus:outline-none"
                >
                  <option>Muscle Gain</option>
                  <option>Fat Loss</option>
                  <option>Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2">Weight (kg)</label>

                <input
                  type="number"
                  placeholder="Enter Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={generateDiet}
                  disabled={loading}
                  className="w-full bg-lime-400 text-black font-bold p-3 rounded-xl hover:bg-lime-300 transition disabled:opacity-60"
                >
                  {loading ? (
                    "Generating..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Plus size={18} />
                      Generate Plan
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {latestDiet && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-lime-400">
                  Latest Diet Plan
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Flame className="text-lime-400 mb-4" />
                    <h3 className="text-zinc-400">Calories</h3>
                    <p className="text-4xl font-bold mt-2">
                      {latestDiet.calories}
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Beef className="text-lime-400 mb-4" />
                    <h3 className="text-zinc-400">Protein</h3>
                    <p className="text-4xl font-bold mt-2">
                      {latestDiet.protein}g
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Wheat className="text-lime-400 mb-4" />
                    <h3 className="text-zinc-400">Carbs</h3>
                    <p className="text-4xl font-bold mt-2">
                      {latestDiet.carbs}g
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Droplets className="text-lime-400 mb-4" />
                    <h3 className="text-zinc-400">Fats</h3>
                    <p className="text-4xl font-bold mt-2">
                      {latestDiet.fats}g
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList className="text-lime-400" />
                  <h2 className="text-2xl font-bold">Meal Plan</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {latestDiet.mealPlan.map((meal, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800/70 border border-zinc-700 rounded-2xl p-5"
                    >
                      <h3 className="text-lime-400 font-semibold mb-2">
                        Meal {index + 1}
                      </h3>

                      <p className="text-zinc-300">{meal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-lime-400" />
              <h2 className="text-2xl font-bold">Diet History</h2>
            </div>

            {diets.length === 0 ? (
              <div className="text-center py-12">
                <Utensils size={60} className="mx-auto text-zinc-600 mb-4" />

                <h3 className="text-2xl font-bold mb-2">No Diet Plans Yet</h3>

                <p className="text-zinc-400">
                  Generate your first personalized diet plan.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {diets.map((diet) => (
                  <div
                    key={diet._id}
                    className="bg-zinc-800/70 border border-zinc-700 rounded-2xl p-6 hover:border-lime-400 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-lime-400">
                          {diet.goal}
                        </h3>

                        <div className="mt-3 space-y-2 text-zinc-300">
                          <p className="flex items-center gap-2">
                            <Weight size={16} />
                            {diet.weight} kg
                          </p>

                          <p>Calories: {diet.calories}</p>

                          <p>Protein: {diet.protein}g</p>

                          <p>Carbs: {diet.carbs}g</p>

                          <p>Fats: {diet.fats}g</p>
                        </div>

                        <p className="text-zinc-500 text-sm mt-4">
                          {new Date(diet.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteDiet(diet._id)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-5 border-t border-zinc-700 pt-4">
                      <h4 className="font-semibold mb-3">Meals</h4>

                      <ul className="space-y-2 text-zinc-400">
                        {diet.mealPlan.map((meal, index) => (
                          <li key={index}>• {meal}</li>
                        ))}
                      </ul>
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

export default Diet;
