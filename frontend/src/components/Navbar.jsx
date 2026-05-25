import { Link } from "react-router-dom";

const Navbar = () => {

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    window.location.reload();
  };

  return (

    <nav className="bg-black text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        FitForge 🔥
      </h1>

      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;