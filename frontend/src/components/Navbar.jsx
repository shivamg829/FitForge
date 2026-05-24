import { Link } from "react-router-dom";

const Navbar = () => {

  return (

    <nav className="bg-black text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        FitForge 🔥
      </h1>

      <div className="flex gap-4">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/dashboard">Dashboard</Link>

      </div>

    </nav>
  );
};

export default Navbar;