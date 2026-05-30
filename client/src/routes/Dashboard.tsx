import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard 🚀</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}