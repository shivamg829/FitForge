import { useEffect, useState } from "react";
import API from "../services/api";
import IMG from "../IMG/Progress.avif";
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Activity,
  FileText,
  Trash2,
  Plus,
  BarChart3,
  Weight,
  HeartPulse,
  Flame,
  Calendar,
} from "lucide-react";

const Progress = () => {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [notes, setNotes] = useState("");

  const [progress, setProgress] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    try {
      const res = await API.get("/progress");
      setProgress(res.data.progress || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/progress/analytics");
      setAnalytics(res.data);
    } catch (error) {
      setAnalytics(null);
    }
  };

  useEffect(() => {
    fetchProgress();
    fetchAnalytics();
  }, []);

  const addProgress = async () => {
    if (!weight) return alert("Enter weight");

    try {
      setLoading(true);

      await API.post("/progress", {
        weight,
        bodyFat,
        muscleMass,
        notes,
      });

      setWeight("");
      setBodyFat("");
      setMuscleMass("");
      setNotes("");

      fetchProgress();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
      alert("Failed to add progress");
    } finally {
      setLoading(false);
    }
  };

  const deleteProgress = async (id) => {
    try {
      await API.delete(`/progress/${id}`);
      setProgress((prev) => prev.filter((p) => p._id !== id));
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:`url(${IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 p-6 md:p-10 text-white">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-10 rounded-3xl border border-lime-500/20 bg-gradient-to-r from-lime-500/20 via-black/40 to-transparent backdrop-blur-xl p-10">
            <h1 className="text-5xl font-black text-lime-400">
              Progress Tracker
            </h1>
            <p className="text-zinc-300 mt-3">
              Track your transformation with real data insights
            </p>
          </div>

          {/* ANALYTICS */}
          {analytics && (
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
                <Scale className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Start Weight</p>
                <h2 className="text-3xl font-bold">
                  {analytics.startingWeight} kg
                </h2>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
                <Activity className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Current Weight</p>
                <h2 className="text-3xl font-bold">
                  {analytics.currentWeight} kg
                </h2>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
                {analytics.weightChange >= 0 ? (
                  <TrendingUp className="text-red-400 mb-3" />
                ) : (
                  <TrendingDown className="text-lime-400 mb-3" />
                )}

                <p className="text-zinc-400">Weight Change</p>
                <h2 className="text-3xl font-bold">
                  {analytics.weightChange.toFixed(1)} kg
                </h2>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
                <BarChart3 className="text-lime-400 mb-3" />
                <p className="text-zinc-400">Total Entries</p>
                <h2 className="text-3xl font-bold">{analytics.totalEntries}</h2>
              </div>
            </div>
          )}

          {/* ADD PROGRESS */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="text-lime-400" />
              <h2 className="text-2xl font-bold">Add Progress</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Body Fat %"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Muscle Mass"
                value={muscleMass}
                onChange={(e) => setMuscleMass(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl"
              />

              <button
                onClick={addProgress}
                disabled={loading}
                className="bg-lime-400 text-black font-bold rounded-xl hover:bg-lime-300 transition"
              >
                {loading ? "Saving..." : "Add"}
              </button>
            </div>

            <textarea
              placeholder="Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-4 bg-zinc-800 border border-zinc-700 p-3 rounded-xl"
            />
          </div>

          {/* HISTORY */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-lime-400" />
              <h2 className="text-2xl font-bold">Progress History</h2>
            </div>

            {progress.length === 0 ? (
              <p className="text-zinc-400">No progress data yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {progress.map((p) => (
                  <div
                    key={p._id}
                    className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lime-400 font-bold">{p.weight} kg</h3>

                      <button
                        onClick={() => deleteProgress(p._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-3 text-zinc-300 space-y-1">
                      <p>Body Fat: {p.bodyFat || "-"}%</p>
                      <p>Muscle Mass: {p.muscleMass || "-"}</p>
                      <p className="text-sm text-zinc-500">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {p.notes && (
                      <div className="mt-3 text-zinc-400 text-sm">
                        {p.notes}
                      </div>
                    )}
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

export default Progress;
