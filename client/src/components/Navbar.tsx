import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth" 
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/">UniShare</Link>
      </div>

      <div style={styles.right}>
        <button onClick={toggleTheme} style={styles.themeBtn}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles: any = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    background: "#111",
    color: "#fff",
    alignItems: "center",
  },
  left: {
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  logout: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  themeBtn: {
    background: "#444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};