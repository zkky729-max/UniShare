import { ReactNode } from "react"
import { Link } from "react-router-dom"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>UniShare Admin</h2>

        <Link to="/admin">📊 Dashboard</Link>
        <Link to="/admin/users">👤 Users</Link>
        <Link to="/faculties">🏛 Faculties</Link>
        <Link to="/admin/specialties">🎓 Specialties</Link>
        <Link to="/admin/years">📚 Years</Link>
        <Link to="/admin/modules">📘 Modules</Link>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 20 }}>
        {children}
      </div>

    </div>
  )
}

const sidebar: React.CSSProperties = {
  width: 220,
  background: "#111",
  color: "#fff",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10
}