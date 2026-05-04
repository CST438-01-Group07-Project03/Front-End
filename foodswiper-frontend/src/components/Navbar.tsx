import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const name = user?.name || user?.login || "You";
  const avatar = user?.picture || user?.avatar_url;

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

      <div className="navbar-user">
        {avatar ? (
          <img src={avatar} alt={name} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">{name[0]}</div>
        )}
        <span className="user-name">{name.split(" ")[0]}</span>
      </div>
    </nav>
  );
}
