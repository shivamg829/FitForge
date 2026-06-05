import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import API from "../services/api";
import { useContext } from "react";

const Navbar = () => {

  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const loadRole = async () => {
      try {
        if (!token) {
          setRole(null);
          return;
        }

        // Backend protects this route with auth middleware and returns profile user (without password)
        const res = await API.get("/auth/profile");
        setRole(res?.data?.role || null);
      } catch {
        setRole(null);
      }
    };

    loadRole();
  }, [token]);

  const navItems = useMemo(() => {
    if (!token) {
      return [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];
    }

    const items = [
      { label: "Dashboard", to: "/dashboard" },
      ...(role === "admin" ? [{ label: "Admin", to: "/admin" }] : []),
      { label: "Calories", to: "/calories" },
      { label: "Workout", to: "/workout" },
      { label: "Progress", to: "/progress" },
      { label: "Diet", to: "/diet" },
      { label: "Profile", to: "/profile" },
    ];

    return items;
  }, [token, role]);

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="
        text-zinc-300
        hover:text-lime-400
        px-3
        py-2
        rounded-lg
        text-sm
        font-medium
        transition-all
        duration-300
        hover:bg-zinc-800
      "
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="
            text-3xl
            font-extrabold
            tracking-wide
            text-lime-400
            hover:text-lime-300
            transition
          "
        >
          FitForge
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} />
          ))}



          {token && (
            <button
              onClick={logout}
              className="
                ml-3
                bg-lime-400
                hover:bg-lime-300
                text-black
                font-bold
                px-4
                py-2
                rounded-lg
                transition-all
                duration-300
              "
            >
              Logout
            </button>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            text-lime-400
            hover:bg-zinc-800
            p-2
            rounded-lg
          "
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}

            {token && (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="
                  mt-2
                  bg-lime-400
                  hover:bg-lime-300
                  text-black
                  font-bold
                  py-2
                  rounded-lg
                  transition
                "
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

