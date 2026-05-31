import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navItems = useMemo(() => {
    if (!token) {
      return [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];
    }

    return [
      { label: "Home", to: "/" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Calories", to: "/calories" },
      { label: "Workout", to: "/workout" },
      { label: "Progress", to: "/progress" },
      { label: "Diet", to: "/diet" },
      { label: "Profile", to: "/profile" },
    ];
  }, [token]);

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-black text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tight">
          FitForge
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems
            .filter((x) => x.to !== "/")
            .map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}

          {token && (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}

            {token && (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="mt-2 bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded-md text-sm font-medium"
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

