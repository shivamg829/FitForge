import { useEffect, useState } from "react";
import API from "../services/api";
import img from "../IMG/Admin.avif";
const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, usersRes] = await Promise.all([
        API.get("/admin/stats"),
        API.get("/admin/users"),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/users/${id}`);
      await fetchAll();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 p-6 md:p-10 text-white">
        <div className="mb-8 rounded-3xl border border-lime-500/20 bg-black/40 backdrop-blur-md p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-lime-400">
            Admin Panel
          </h1>
          <p className="mt-3 text-zinc-300 text-lg">
            Manage users and view dashboard statistics.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-zinc-200">Loading...</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
                <p className="text-sm text-zinc-400">Total Users</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {stats?.totalUsers ?? "-"}
                </h3>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
                <p className="text-sm text-zinc-400">Total Calories</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {stats?.totalCalories ?? "-"}
                </h3>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
                <p className="text-sm text-zinc-400">Total Workouts</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {stats?.totalWorkouts ?? "-"}
                </h3>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
                <p className="text-sm text-zinc-400">Total Diets</p>
                <h3 className="mt-2 text-3xl font-bold">
                  {stats?.totalDiets ?? "-"}
                </h3>
              </div>
            </div>

            <div className="mt-8 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-lime-400">Users</h2>
                <p className="text-zinc-400">{users.length} user(s)</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-zinc-400 border-b border-zinc-800">
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Email</th>
                      <th className="py-3 px-2">Role</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-zinc-800">
                        <td className="py-3 px-2 text-zinc-200">
                          {u.name || "-"}
                        </td>
                        <td className="py-3 px-2 text-zinc-200">
                          {u.email || "-"}
                        </td>
                        <td className="py-3 px-2 text-zinc-200">
                          {u.role || "-"}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleDelete(u._id)}
                            className="bg-red-500/90 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 px-2 text-zinc-400">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {typeof stats?.totalProgress !== "undefined" && (
              <div className="mt-6 text-zinc-300">
                Total Progress records: {stats.totalProgress}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
