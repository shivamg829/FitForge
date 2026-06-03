import { useEffect, useState } from "react";
import API from "../services/api";
import {
  User,
  Upload,
  Target,
  Activity,
  Scale,
  Ruler,
  Save,
  Mail,
  Trophy,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    height: "",
    goal: "",
    fitnessLevel: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setUser(res.data);

      setFormData({
        name: res.data.name || "",
        weight: res.data.weight || "",
        height: res.data.height || "",
        goal: res.data.goal || "",
        fitnessLevel: res.data.fitnessLevel || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put("/auth/update-profile", formData);
      alert("Profile Updated Successfully");
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      return alert("Select an image first");
    }

    const data = new FormData();
    data.append("profileImage", image);

    try {
      await API.post("/auth/upload-profile", data);
      alert("Image Uploaded Successfully");
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const bmi =
    formData.height && formData.weight
      ? (
          Number(formData.weight) /
          Math.pow(Number(formData.height) / 100, 2)
        ).toFixed(1)
      : "0";

  let bmiStatus = "Not Available";

  if (bmi > 0 && bmi < 18.5) bmiStatus = "Underweight";
  else if (bmi >= 18.5 && bmi < 25) bmiStatus = "Healthy";
  else if (bmi >= 25) bmiStatus = "Overweight";

  let completedFields = 0;

  if (user?.name) completedFields++;
  if (user?.weight) completedFields++;
  if (user?.height) completedFields++;
  if (user?.goal) completedFields++;
  if (user?.profileImage) completedFields++;

  const completion = (completedFields / 5) * 100;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 p-6 md:p-10 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-lime-500/20 bg-linear-to-r from-lime-500/20 to-transparent backdrop-blur-md p-10 mb-8">
            <h1 className="text-5xl font-extrabold text-lime-400">
              My Profile
            </h1>

            <p className="text-zinc-300 mt-3 text-lg">
              Manage your account, fitness goals and personal information.
            </p>
          </div>

          {user && (
            <>
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
                  <div className="flex flex-col items-center">
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:8000${user.profileImage}`}
                        alt="profile"
                        className="w-40 h-40 rounded-full object-cover border-4 border-lime-400"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-lime-400 text-black flex items-center justify-center text-6xl font-extrabold border-4 border-lime-300">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}

                    <h2 className="text-3xl font-bold text-lime-400 mt-5">
                      {user.name}
                    </h2>

                    <div className="flex items-center gap-2 mt-3 text-zinc-400">
                      <Mail size={16} />
                      {user.email}
                    </div>

                    <div className="w-full mt-8">
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                      />

                      <button
                        type="button"
                        onClick={uploadImage}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition"
                      >
                        <Upload size={18} />
                        Upload Profile Photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Scale className="text-lime-400" />
                      <h3 className="text-xl font-bold">BMI Score</h3>
                    </div>

                    <p className="text-5xl font-extrabold text-lime-400">
                      {bmi}
                    </p>

                    <p className="text-zinc-400 mt-3">
                      {bmiStatus}
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="text-lime-400" />
                      <h3 className="text-xl font-bold">Current Goal</h3>
                    </div>

                    <p className="text-2xl font-semibold">
                      {user.goal || "Not Set"}
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Activity className="text-lime-400" />
                      <h3 className="text-xl font-bold">
                        Fitness Level
                      </h3>
                    </div>

                    <p className="text-2xl font-semibold">
                      {user.fitnessLevel || "Not Set"}
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="text-lime-400" />
                      <h3 className="text-xl font-bold">
                        Profile Completion
                      </h3>
                    </div>

                    <p className="text-4xl font-extrabold text-lime-400">
                      {completion}%
                    </p>

                    <div className="w-full h-3 bg-zinc-800 rounded-full mt-4">
                      <div
                        className="h-3 bg-lime-400 rounded-full"
                        style={{
                          width: `${completion}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-lime-400 mb-8">
                  Edit Profile
                </h2>

                <form
                  onSubmit={updateProfile}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-4 text-zinc-500"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 pl-11 focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <div className="relative">
                    <Scale
                      size={18}
                      className="absolute left-4 top-4 text-zinc-500"
                    />

                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Weight (kg)"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 pl-11 focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <div className="relative">
                    <Ruler
                      size={18}
                      className="absolute left-4 top-4 text-zinc-500"
                    />

                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Height (cm)"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 pl-11 focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-lime-400"
                  >
                    <option value="">Select Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Maintain">Maintain</option>
                  </select>

                  <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleChange}
                    className="md:col-span-2 w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-lime-400"
                  >
                    <option value="">Select Fitness Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>

                  <button
                    type="submit"
                    className="md:col-span-2 flex items-center justify-center gap-2 bg-lime-400 text-black font-bold py-4 rounded-xl hover:bg-lime-300 transition"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;