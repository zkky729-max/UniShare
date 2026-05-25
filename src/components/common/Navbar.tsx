import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <span>UniShare</span>

      <div style={{ float: "right" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              {user.email}
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </nav>
  );
}