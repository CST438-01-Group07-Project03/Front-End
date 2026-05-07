import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import "./Navbar.css";

export default function Navbar() {
  const auth = useAuth() as any;
  const user = auth.user;
  const logout = auth.logout;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const name = user?.username || user?.name || user?.login || "You";
  const avatar = user?.avatarUrl || user?.picture || user?.avatar_url;
  const isAdmin = user?.isAdmin === true;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>🍔</span>
        <span className="navbar-brand">FoodSwiper</span>
      </div>

      <div className="navbar-links">
        {[
          { to: "/", label: "Discover", icon: "🔥" },
          { to: "/favorites", label: "Favorites", icon: "❤️" },
          { to: "/groups", label: "Groups", icon: "👥" },
        ].map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="navbar-user-menu" ref={menuRef}>
        <button
          className="navbar-user navbar-user-button"
          onClick={() => setMenuOpen((open: boolean) => !open)}
          type="button"
        >
          {avatar ? (
            <img src={avatar} alt={name} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">{name[0]}</div>
          )}
          <span className="user-name">{name.split(" ")[0]}</span>
        </button>

        {menuOpen && (
          <div className="user-dropdown">
            {isAdmin && (
              <button
                className="user-dropdown-item"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin");
                }}
                type="button"
              >
                Admin Settings
              </button>
            )}

            <button
              className="user-dropdown-item danger"
              onClick={() => {
                setMenuOpen(false);
                if (logout) logout();
              }}
              type="button"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}