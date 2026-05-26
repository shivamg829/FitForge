import { useEffect, useState } from "react";

import API from "../services/api";

const Dashboard = () => {

  const [user, setUser] = useState(null);

  const [calories, setCalories] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const profileRes = await API.get(
          "/auth/profile"
        );

        setUser(profileRes.data);

        const caloriesRes = await API.get(
          "/calories"
        );

        setCalories(caloriesRes.data);

      } catch(error){

        console.log(error);
      }
    };

    fetchData();

  }, []);

  const totalCalories = calories.reduce(

    (acc, item) => acc + item.calories,

    0
  );

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold">
        Dashboard 📊
      </h1>

      {user && (

        <div className="mt-6">

          <h2 className="text-2xl font-semibold">
            Welcome, {user.name}
          </h2>

          <p className="mt-2">
            {user.email}
          </p>

        </div>
      )}

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="shadow-lg rounded-xl p-6 border">

          <h2 className="text-xl font-semibold">
            Total Calories
          </h2>

          <p className="text-3xl font-bold mt-4">
            {totalCalories}
          </p>

        </div>

        <div className="shadow-lg rounded-xl p-6 border">

          <h2 className="text-xl font-semibold">
            Total Entries
          </h2>

          <p className="text-3xl font-bold mt-4">
            {calories.length}
          </p>

        </div>

        <div className="shadow-lg rounded-xl p-6 border">

          <h2 className="text-xl font-semibold">
            Fitness Goal
          </h2>

          <p className="text-3xl font-bold mt-4">
            {user?.goal || "Not Set"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;