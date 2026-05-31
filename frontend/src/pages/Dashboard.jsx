import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

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
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const totalCalories = calories.reduce((acc, item) => acc + item.calories, 0);

  const bmi =
    user?.weight && user?.height
      ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1)
      : "N/A";

  let bmiStatus = "";

  if (bmi !== "N/A") {
    if (bmi < 18.5) {
      bmiStatus = "Underweight";
    } else if (bmi < 25) {
      bmiStatus = "Normal";
    } else {
      bmiStatus = "Overweight";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard 📊</h1>

      {user && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                user.profileImage
                  ? `http://localhost:8000${user.profileImage}`
                  : "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <div>
              <h2 className="text-3xl font-bold">Welcome, {user.name} 👋</h2>

              <p className="text-gray-600 mt-2">{user.email}</p>

              <p className="mt-2">🎯 Goal: {user.goal || "Not Set"}</p>

              <p>💪 Level: {user.fitnessLevel || "Not Set"}</p>
            </div>
          </div>
        </div>
      )}

      {/* STATISTICS */}

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Calories</h2>

          <p className="text-3xl font-bold mt-3">{totalCalories}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Food Entries</h2>

          <p className="text-3xl font-bold mt-3">{calories.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Weight</h2>

          <p className="text-3xl font-bold mt-3">{user?.weight || "N/A"} kg</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold">Height</h2>

          <p className="text-3xl font-bold mt-3">{user?.height || "N/A"} cm</p>
        </div>
      </div>

      {/* BMI SECTION */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">BMI Analysis ⚖️</h2>

          <p className="text-4xl font-bold">{bmi}</p>

          <p className="text-gray-600 mt-2">{bmiStatus}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Fitness Summary 🏆</h2>

          <p>Goal: {user?.goal || "Not Set"}</p>

          <p>Level: {user?.fitnessLevel || "Not Set"}</p>

          <p>Calories Logged: {totalCalories}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions 🚀</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/calories"
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-3 rounded-lg font-medium"
          >
            Calories Tracker
          </Link>

          <Link
            to="/workout"
            className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-lg font-medium"
          >
            Workout Plan
          </Link>

          <Link
            to="/diet"
            className="bg-purple-500 hover:bg-purple-600 transition text-white px-5 py-3 rounded-lg font-medium"
          >
            Diet Planner
          </Link>

          <Link
            to="/progress"
            className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-3 rounded-lg font-medium"
          >
            Progress Tracker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
