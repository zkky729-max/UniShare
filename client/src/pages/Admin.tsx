import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import DashboardLayout from "../layouts/DashboardLayout"

export default function Admin() {
  const [usersCount, setUsersCount] = useState(0)
  const [facultiesCount, setFacultiesCount] = useState(0)
  const [specialtiesCount, setSpecialtiesCount] = useState(0)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    const { count: users } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    const { count: faculties } = await supabase
      .from("faculties")
      .select("*", { count: "exact", head: true })

    const { count: specialties } = await supabase
      .from("specialties")
      .select("*", { count: "exact", head: true })

    setUsersCount(users || 0)
    setFacultiesCount(faculties || 0)
    setSpecialtiesCount(specialties || 0)
  }

  return (
    <DashboardLayout>
      <div style={{ padding: 20 }}>

        <h1 style={{ fontSize: 30, fontWeight: "bold" }}>
          🔴 Admin Dashboard
        </h1>

        <p style={{ color: "gray", marginTop: 5 }}>
          System control panel
        </p>

        {/* STATS */}
        <div style={{
          display: "flex",
          gap: 20,
          marginTop: 30
        }}>

          <div style={card}>
            <h3>👤 Users</h3>
            <p style={number}>{usersCount}</p>
          </div>

          <div style={card}>
            <h3>🏛 Faculties</h3>
            <p style={number}>{facultiesCount}</p>
          </div>

          <div style={card}>
            <h3>🎓 Specialties</h3>
            <p style={number}>{specialtiesCount}</p>
          </div>

        </div>

        {/* ACTIONS */}
        <div style={{ marginTop: 40 }}>
          <h2>⚙️ Management</h2>

          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>

            <a href="/faculties" style={button}>
              🏛 Manage Faculties
            </a>

            <a href="/dashboard" style={button}>
              📊 View User Dashboard
            </a>

          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

const card: React.CSSProperties = {
  flex: 1,
  padding: 20,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
}

const number: React.CSSProperties = {
  fontSize: 30,
  fontWeight: "bold",
  marginTop: 10
}

const button: React.CSSProperties = {
  padding: "10px 15px",
  background: "#111",
  color: "#fff",
  borderRadius: 8,
  textDecoration: "none"
}