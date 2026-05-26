import { useEffect, useState } from "react";

import API from "../services/api";

const Calories = () => {
  const [food, setFood] = useState("");

  const [calories, setCalories] = useState("");

  const [entries, setEntries] = useState([]);

  // FETCH CALORIES
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

  // ADD CALORIES
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/calories", {
        food,
        calories: Number(calories),
      });

      setEntries([res.data, ...entries]);


      setFood("");
      setCalories("");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ENTRY
  const deleteEntry = async (id) => {
    try {
      await API.delete(`/calories/${id}`);

      setEntries(entries.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL CALORIES
  const totalCalories = entries.reduce(
    (acc, item) => acc + item.calories,

    0,
  );

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Calories Tracker 🍎</h1>

      {/* FORM */}

      <form onSubmit={handleSubmit} className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Food Name"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="border p-3 rounded w-64"
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="border p-3 rounded w-40"
        />

        <button className="bg-black text-white px-6 rounded">Add</button>
      </form>

      {/* SUMMARY */}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Total Calories:
          <span className="ml-2">{totalCalories}</span>
        </h2>
      </div>

      {/* ENTRIES */}

      <div className="grid md:grid-cols-3 gap-6">
        {entries.map((item) => (
          <div key={item._id} className="shadow-lg rounded-xl p-5 border">
            <h2 className="text-2xl font-bold">{item.food}</h2>

            <p className="mt-2 text-lg">{item.calories} Calories</p>

            <button
              onClick={() => deleteEntry(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calories;
