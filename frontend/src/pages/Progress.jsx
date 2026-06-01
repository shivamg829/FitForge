import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const [weight, setWeight] = useState("");

  const [progressData, setProgressData] = useState([
    {
      day: "Mon",
      weight: 72,
    },

    {
      day: "Tue",
      weight: 71.5,
    },

    {
      day: "Wed",
      weight: 71,
    },
  ]);

  // ADD PROGRESS

  const addProgress = () => {
    if (!weight) {
      return;
    }

    const newEntry = {
      day: `Day ${progressData.length + 1}`,

      weight: Number(weight),
    };

    setProgressData([...progressData, newEntry]);

    setWeight("");
  };

  // CURRENT WEIGHT

  const latestWeight = progressData[progressData.length - 1]?.weight;

  // START WEIGHT

  const startWeight = progressData[0]?.weight;

  // DIFFERENCE

  const progressDifference = latestWeight - startWeight;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Starting Weight</h2>

          <p className="text-3xl font-bold mt-3">{startWeight} kg</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Current Weight</h2>

          <p className="text-3xl font-bold mt-3">{latestWeight} kg</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Progress</h2>

          <p className="text-3xl font-bold mt-3">
            {progressDifference > 0
              ? `+${progressDifference}`
              : progressDifference}{" "}
            kg
          </p>
        </div>
      </div>

      {/* INPUT */}

      <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold mb-5">Add Weight Entry</h2>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-3 rounded-lg w-64"
          />

          <button
            onClick={addProgress}
            className="bg-black text-white px-6 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* CHART */}

      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8">Weight Progress Chart</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="weight" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* HISTORY */}

      <div className="bg-white shadow-lg rounded-2xl p-8 mt-10">
        <h2 className="text-3xl font-bold mb-6">Progress History</h2>

        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between"
            >
              <span>{item.day}</span>

              <span>{item.weight} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
