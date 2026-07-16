import { useEffect, useState } from "react";
import API from "../services/api";
import IMG from "../IMG/DashWorkProf.avif";
import {
  Dumbbell,
  Target,
  Calendar,
  Trophy,
  Activity,
  Trash2,
  Plus,
  Clock,
  BarChart3,
  Flame,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";

const Workout = () => {
  const [goal, setGoal] = useState("Muscle Gain");
  const [experience, setExperience] = useState("Beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/workout");
      setWorkouts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const generateWorkout = async () => {
    try {
      setLoading(true);

      await API.post("/workout", {
        goal,
        experience,
        daysPerWeek: Number(daysPerWeek),
      });

      fetchWorkouts();
    } catch (error) {
      console.log(error);
      alert("Failed to generate workout plan");
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await API.delete(`/workout/${id}`);

      setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const latestWorkout = workouts.length > 0 ? workouts[0] : null;

  const getGoalColor = (goal) => {
    if (goal === "Muscle Gain") return "text-lime-400";
    if (goal === "Fat Loss") return "text-orange-400";
    return "text-cyan-400";
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          `url('${IMG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 p-6 md:p-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-lime-500/20 backdrop-blur-xl bg-gradient-to-r from-lime-500/20 via-black/40 to-transparent p-10 mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell size={42} className="text-lime-400" />
                <span className="text-lime-400 font-semibold uppercase tracking-widest">
                  FitForge Workout Planner
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black">
                Build Strength.
              </h1>

              <h1 className="text-5xl md:text-6xl font-black text-lime-400">
                Stay Consistent.
              </h1>

              <p className="mt-5 text-zinc-300 text-lg max-w-2xl">
                Generate personalized workout programs based on your fitness
                goals, experience level, and weekly availability.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-3 mb-8">
              <Target className="text-lime-400" />
              <h2 className="text-2xl font-bold">Generate Workout Plan</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
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
                <label className="block text-zinc-400 mb-2">Experience</label>

                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:border-lime-400 focus:outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2">Days / Week</label>

                <select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:border-lime-400 focus:outline-none"
                >
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={6}>6 Days</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={generateWorkout}
                  disabled={loading}
                  className="w-full bg-lime-400 text-black font-bold p-3 rounded-xl hover:bg-lime-300 transition"
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

          {latestWorkout && (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-lime-400 mb-6">
                  Latest Workout Program
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Trophy className="text-lime-400 mb-4" />
                    <p className="text-zinc-400">Goal</p>
                    <h3
                      className={`text-2xl font-bold mt-2 ${getGoalColor(
                        latestWorkout.goal,
                      )}`}
                    >
                      {latestWorkout.goal}
                    </h3>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Award className="text-lime-400 mb-4" />
                    <p className="text-zinc-400">Experience</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {latestWorkout.experience}
                    </h3>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Calendar className="text-lime-400 mb-4" />
                    <p className="text-zinc-400">Days / Week</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {latestWorkout.daysPerWeek}
                    </h3>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                    <Activity className="text-lime-400 mb-4" />
                    <p className="text-zinc-400">Sessions</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {latestWorkout.plan.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <Dumbbell className="text-lime-400" />
                  <h2 className="text-2xl font-bold">
                    Weekly Workout Schedule
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {latestWorkout.plan.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 hover:border-lime-400 transition"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lime-400">
                          Day {index + 1}
                        </h3>

                        <CheckCircle size={18} className="text-lime-400" />
                      </div>

                      <p className="text-lg font-semibold">{exercise}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-10">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                  <BarChart3 className="text-lime-400 mb-3" />
                  <h3 className="text-zinc-400">Weekly Sessions</h3>
                  <p className="text-3xl font-bold mt-2">
                    {latestWorkout.plan.length}
                  </p>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                  <Clock className="text-lime-400 mb-3" />
                  <h3 className="text-zinc-400">Duration</h3>
                  <p className="text-3xl font-bold mt-2">8-12</p>
                  <p className="text-zinc-500 text-sm">Weeks</p>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                  <Zap className="text-lime-400 mb-3" />
                  <h3 className="text-zinc-400">Intensity</h3>
                  <p className="text-3xl font-bold mt-2">
                    {latestWorkout.experience}
                  </p>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6">
                  <Flame className="text-lime-400 mb-3" />
                  <h3 className="text-zinc-400">Goal</h3>
                  <p className="text-2xl font-bold mt-2">
                    {latestWorkout.goal}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="text-lime-400" />
              <h2 className="text-2xl font-bold">Workout History</h2>
            </div>

            {workouts.length === 0 ? (
              <div className="text-center py-16">
                <Dumbbell size={70} className="mx-auto text-zinc-700 mb-4" />

                <h3 className="text-2xl font-bold">No Workout Plans Yet</h3>

                <p className="text-zinc-400 mt-2">
                  Generate your first workout plan above.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {workouts.map((workout) => (
                  <div
                    key={workout._id}
                    className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 hover:border-lime-400 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`text-2xl font-bold ${getGoalColor(
                            workout.goal,
                          )}`}
                        >
                          {workout.goal}
                        </h3>

                        <div className="space-y-2 mt-4 text-zinc-300">
                          <p>Experience: {workout.experience}</p>

                          <p>Days / Week: {workout.daysPerWeek}</p>

                          <p>Sessions: {workout.plan.length}</p>
                        </div>

                        <p className="text-zinc-500 text-sm mt-4">
                          {new Date(workout.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteWorkout(workout._id)}
                        className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="border-t border-zinc-700 mt-5 pt-5">
                      <h4 className="font-semibold mb-3 text-lime-400">
                        Workout Schedule
                      </h4>

                      <div className="space-y-2">
                        {workout.plan.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 text-zinc-300"
                          >
                            <CheckCircle size={16} className="text-lime-400" />
                            <span>
                              Day {index + 1}: {item}
                            </span>
                          </div>
                        ))}
                      </div>
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

export default Workout;
