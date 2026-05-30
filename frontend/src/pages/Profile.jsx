import { useEffect, useState } from "react";
import API from "../services/api";

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

  // BMI

  const bmi =
    formData.height && formData.weight
      ? (
          Number(formData.weight) / Math.pow(Number(formData.height) / 100, 2)
        ).toFixed(1)
      : 0;

  let bmiStatus = "";

  if (bmi > 0 && bmi < 18.5) {
    bmiStatus = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiStatus = "Normal";
  } else if (bmi >= 25) {
    bmiStatus = "Overweight";
  }

  // Profile Completion

  let completedFields = 0;

  if (user?.name) completedFields++;
  if (user?.weight) completedFields++;
  if (user?.height) completedFields++;
  if (user?.goal) completedFields++;
  if (user?.profileImage) completedFields++;

  const completion = (completedFields / 5) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-10">My Profile 👤</h1>

      {user && (
        <div className="max-w-5xl mx-auto">
          {/* PROFILE CARD */}

          <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
            <div className="flex flex-col items-center">
              <img
                src={
                  user.profileImage
                    ? `http://localhost:8000${user.profileImage}`
                    : "https://via.placeholder.com/150"
                }
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
              />

              <h2 className="text-3xl font-bold mt-5">{user.name}</h2>

              <p className="text-gray-600 mt-2">{user.email}</p>

              {/* IMAGE UPLOAD */}

              <div className="mt-5 flex gap-3">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <button
                  type="button"
                  onClick={uploadImage}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="font-bold text-xl">BMI</h2>

              <p className="text-3xl mt-3">{bmi}</p>

              <p className="text-gray-600">{bmiStatus}</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="font-bold text-xl">Goal</h2>

              <p className="text-2xl mt-3">{user.goal || "Not Set"}</p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="font-bold text-xl">Profile Completion</h2>

              <p className="text-3xl mt-3">{completion}%</p>
            </div>
          </div>

          {/* EDIT PROFILE */}

          <form
            onSubmit={updateProfile}
            className="bg-white shadow-lg rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="border p-3 rounded-lg"
              />

              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
              >
                <option value="">Select Fitness Level</option>

                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-lg mt-6 hover:bg-gray-800">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
