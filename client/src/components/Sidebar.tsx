import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">UniShare</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/faculties">Faculties</Link>
        <Link to="/specialties">Specialties</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </aside>
  )
}