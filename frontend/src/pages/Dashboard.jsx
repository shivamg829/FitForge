import { useEffect, useState } from "react";

import API from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard 📊</h1>

      {user && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>

          <p className="mt-2">Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
