import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import IMG from "../IMG/DashWorkProf.avif";
import { getImageUrl } from "../utils/imageUrl";
import {
  Flame,
  Utensils,
  Scale,
  Ruler,
  Target,
  Activity,
  TrendingUp,
  Dumbbell,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [calories, setCalories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get("/auth/profile");
        setUser(profileRes.data);

        const caloriesRes = await API.get("/calories");
        setCalories(caloriesRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const totalCalories = calories.reduce((acc, item) => acc + item.calories, 0);

  const bmi =
    user?.weight && user?.height
      ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1)
      : "N/A";

  let bmiStatus = "Not Available";

  if (bmi !== "N/A") {
    if (bmi < 18.5) bmiStatus = "Underweight";
    else if (bmi < 25) bmiStatus = "Healthy";
    else if (bmi < 30) bmiStatus = "Overweight";
    else bmiStatus = "Obese";
  }

  const getBmiColor = () => {
    if (bmi === "N/A") return "bg-zinc-700";
    if (bmi < 18.5) return "bg-yellow-500";
    if (bmi < 25) return "bg-lime-500";
    if (bmi < 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const stats = [
    {
      title: "Total Calories",
      value: totalCalories,
      icon: Flame,
    },
    {
      title: "Food Entries",
      value: calories.length,
      icon: Utensils,
    },
    {
      title: "Weight",
      value: `${user?.weight || "N/A"} kg`,
      icon: Scale,
    },
    {
      title: "Height",
      value: `${user?.height || "N/A"} cm`,
      icon: Ruler,
    },
  ];

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
        <div className="mb-8 rounded-3xl border border-lime-500/20 bg-black/40 backdrop-blur-md p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-lime-400">
            Welcome Back, {user?.name || "Athlete"}
          </h1>

          <p className="mt-3 text-zinc-300 text-lg">
            Track your progress, stay consistent, and reach your fitness goals.
          </p>
        </div>

        {user && (
          <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {user.profileImage ? (
                <img
                  src={getImageUrl(user.profileImage)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-lime-400"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-lime-400 text-black flex items-center justify-center text-5xl font-extrabold border-4 border-lime-300">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-lime-400">
                  {user.name}
                </h2>

                <p className="mt-2 text-zinc-400">{user.email}</p>

                <div className="flex flex-wrap gap-3 mt-5">
                  <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
                    <Target size={16} />
                    <span>Goal: {user.goal || "Not Set"}</span>
                  </div>

                  <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
                    <Activity size={16} />
                    <span>Fitness Level: {user.fitnessLevel || "Not Set"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-lime-400 transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                  <Icon size={22} className="text-lime-400" />
                </div>

                <p className="text-sm text-zinc-400">{stat.title}</p>

                <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-lime-400 mb-5">
              BMI Analysis
            </h2>

            <div className="text-6xl font-extrabold">{bmi}</div>

            <span
              className={`inline-block mt-5 px-4 py-2 rounded-full text-sm font-semibold text-black ${getBmiColor()}`}
            >
              {bmiStatus}
            </span>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-lime-400 mb-5">
              <TrendingUp size={24} />
              Fitness Summary
            </h2>

            <div className="space-y-4 text-zinc-300">
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span>Goal</span>
                <span>{user?.goal || "Not Set"}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span>Fitness Level</span>
                <span>{user?.fitnessLevel || "Not Set"}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span>Total Calories</span>
                <span>{totalCalories}</span>
              </div>

              <div className="flex justify-between">
                <span>Food Entries</span>
                <span>{calories.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-lime-400 mb-6">
            Quick Actions
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            <Link
              to="/calories"
              className="flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-xl transition"
            >
              <Flame size={18} />
              Calories Tracker
            </Link>

            <Link
              to="/workout"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl transition"
            >
              <Dumbbell size={18} />
              Workout Plan
            </Link>

            <Link
              to="/diet"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl transition"
            >
              <Utensils size={18} />
              Diet Planner
            </Link>

            <Link
              to="/progress"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl transition"
            >
              <TrendingUp size={18} />
              Progress Tracker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
