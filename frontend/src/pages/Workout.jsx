import { useState } from "react";

const workoutPlans = {
  muscleGain: {
    title: "Muscle Gain Plan" ,

    split: [
      {
        day: "Monday",
        muscle: "Chest + Triceps",
        duration: "60 mins",
        caloriesBurn: "450 kcal",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",

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
        duration: "55 mins",
        caloriesBurn: "400 kcal",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",

        exercises: ["Pull Ups", "Deadlift", "Barbell Row", "Bicep Curls"],
      },

      {
        day: "Wednesday",
        muscle: "Legs",
        duration: "70 mins",
        caloriesBurn: "550 kcal",
        image: "https://images.unsplash.com/photo-1434596922112-19c563067271",

        exercises: ["Squats", "Leg Press", "Lunges", "Calf Raises"],
      },

      {
        day: "Thursday",
        muscle: "Shoulders",
        duration: "50 mins",
        caloriesBurn: "350 kcal",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",

        exercises: ["Shoulder Press", "Lateral Raises", "Front Raises"],
      },

      {
        day: "Friday",
        muscle: "Arms + Abs",
        duration: "45 mins",
        caloriesBurn: "300 kcal",
        image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712",

        exercises: ["Hammer Curls", "Tricep Pushdown", "Crunches", "Plank"],
      },
    ],
  },

  weightLoss: {
    title: "Weight Loss Plan" ,

    split: [
      {
        day: "Monday",
        muscle: "Full Body HIIT",
        duration: "40 mins",
        caloriesBurn: "500 kcal",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",

        exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "Push Ups"],
      },

      {
        day: "Tuesday",
        muscle: "Cardio",
        duration: "45 mins",
        caloriesBurn: "450 kcal",
        image: "https://images.unsplash.com/photo-1483721310020-03333e577078",

        exercises: ["Running", "Cycling", "Jump Rope"],
      },

      {
        day: "Wednesday",
        muscle: "Core Workout",
        duration: "35 mins",
        caloriesBurn: "300 kcal",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",

        exercises: ["Plank", "Russian Twists", "Leg Raises"],
      },

      {
        day: "Thursday",
        muscle: "Lower Body",
        duration: "50 mins",
        caloriesBurn: "400 kcal",
        image: "https://images.unsplash.com/photo-1434596922112-19c563067271",

        exercises: ["Squats", "Lunges", "Step Ups"],
      },

      {
        day: "Friday",
        muscle: "Fat Burn Circuit",
        duration: "45 mins",
        caloriesBurn: "480 kcal",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",

        exercises: ["Jumping Jacks", "High Knees", "Push Ups"],
      },
    ],
  },
};

const Workout = () => {
  const [goal, setGoal] = useState("muscleGain");

  const currentPlan = workoutPlans[goal];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-5xl font-bold mb-10 text-center">\n        Workout Planner\n      </h1>

      {/* SELECTOR */}

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

      <h2 className="text-3xl font-semibold mb-10 text-center">
        {currentPlan.title}
      </h2>

      {/* CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPlan.split.map((workout, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >
            {/* IMAGE */}

            <img
              src={workout.image}
              alt={workout.muscle}
              className="h-52 w-full object-cover"
            />

            {/* CONTENT */}

            <div className="p-6">
              <h2 className="text-2xl font-bold">{workout.day}</h2>

              <p className="text-lg mt-2 text-gray-700">{workout.muscle}</p>

              {/* STATS */}

              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>⏱ {workout.duration}</span>

                <span>🔥 {workout.caloriesBurn}</span>
              </div>

              {/* EXERCISES */}

              <div className="mt-5">
                <h3 className="font-semibold mb-2">Exercises</h3>

                <ul className="list-disc ml-5 space-y-1">
                  {workout.exercises.map((exercise, i) => (
                    <li key={i}>{exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
