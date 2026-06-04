import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import ErrorScreen from "../components/ErrorScreen";
import { normalizeApiError } from "../utils/apiError";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorState(null);
    setLoading(true);

    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (error) {
      setErrorState(normalizeApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {errorState && (
        <ErrorScreen
          title={errorState.title}
          message={errorState.message}
          ctaLabel="Go to Login"
          onCta={() => navigate("/login")}
          showMeta={false}
        />
      )}

      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold tracking-wide text-lime-400">
              FitForge
            </h1>

            <p className="text-zinc-400 mt-3 text-sm">
              Transform Your Body. Track Every Rep.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                text-white
                px-4
                py-3
                rounded-xl
                focus:outline-none
                focus:border-lime-400
                focus:ring-2
                focus:ring-lime-400/20
              "
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                text-white
                px-4
                py-3
                rounded-xl
                focus:outline-none
                focus:border-lime-400
                focus:ring-2
                focus:ring-lime-400/20
              "
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                text-white
                px-4
                py-3
                rounded-xl
                focus:outline-none
                focus:border-lime-400
                focus:ring-2
                focus:ring-lime-400/20
              "
            />
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-lime-400
                hover:bg-lime-300
                text-black
                font-bold
                py-3
                rounded-xl
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-zinc-700"></div>
            <span className="px-4 text-zinc-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-zinc-700"></div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              w-full
              border
              border-lime-400
              text-lime-400
              font-semibold
              py-3
              rounded-xl
              hover:bg-lime-400
              hover:text-black
              transition-all
              duration-300
            "
          >
            LOGIN TO EXISTING ACCOUNT
          </button>
        </div>
        <div className="text-center mt-6 text-zinc-500 text-sm">
          Already a member?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-lime-400 hover:text-lime-300 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;