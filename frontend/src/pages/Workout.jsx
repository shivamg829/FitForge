import { useState } from "react";

const workoutPlans = {
  muscleGain: {
    title: "Muscle Gain Plan 💪",

    split: [
      {
        day: "Monday",
        muscle: "Chest + Triceps",
        exercises: [
          "Bench Press",
          "Push Ups",
          "Incline Dumbbell Press",
          "Tricep Dips",
        ],
      },

      {
        day: "Tuesday",
        muscle: "Back + Biceps",
        exercises: ["Pull Ups", "Deadlift", "Barbell Row", "Bicep Curls"],
      },

      {
        day: "Wednesday",
        muscle: "Legs",
        exercises: ["Squats", "Leg Press", "Lunges", "Calf Raises"],
      },

      {
        day: "Thursday",
        muscle: "Shoulders",
        exercises: ["Shoulder Press", "Lateral Raises", "Front Raises"],
      },

      {
        day: "Friday",
        muscle: "Arms + Abs",
        exercises: ["Hammer Curls", "Tricep Pushdown", "Crunches", "Plank"],
      },
    ],
  },

  weightLoss: {
    title: "Weight Loss Plan 🔥",

    split: [
      {
        day: "Monday",
        muscle: "Full Body HIIT",
        exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "Push Ups"],
      },

      {
        day: "Tuesday",
        muscle: "Cardio",
        exercises: ["Running", "Cycling", "Jump Rope"],
      },

      {
        day: "Wednesday",
        muscle: "Core Workout",
        exercises: ["Plank", "Russian Twists", "Leg Raises"],
      },

      {
        day: "Thursday",
        muscle: "Lower Body",
        exercises: ["Squats", "Lunges", "Step Ups"],
      },

      {
        day: "Friday",
        muscle: "Fat Burn Circuit",
        exercises: ["Jumping Jacks", "High Knees", "Push Ups"],
      },
    ],
  },
};

const Workout = () => {
  const [goal, setGoal] = useState("muscleGain");

  const currentPlan = workoutPlans[goal];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Workout Planner 🏋️</h1>

      {/* GOAL SELECTOR */}

      <div className="mb-10">
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="muscleGain">Muscle Gain</option>

          <option value="weightLoss">Weight Loss</option>
        </select>
      </div>

      {/* PLAN TITLE */}

      <h2 className="text-3xl font-semibold mb-8">{currentPlan.title}</h2>

      {/* WORKOUT CARDS */}

      <div className="grid md:grid-cols-2 gap-6">
        {currentPlan.split.map((workout, index) => (
          <div key={index} className="shadow-lg rounded-xl p-6 border">
            <h2 className="text-2xl font-bold">{workout.day}</h2>

            <p className="text-lg mt-2">{workout.muscle}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Exercises:</h3>

              <ul className="list-disc ml-6">
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
