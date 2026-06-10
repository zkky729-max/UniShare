import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import DashboardLayout from "../../layouts/DashboardLayout"

type Profile = {
  id: string
  full_name: string
  role: string
  user_id: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const { data } = await supabase.from("profiles").select("*")
    setUsers(data || [])
  }

  async function changeRole(id: string, role: string) {
    await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id)

    loadUsers()
  }

  return (
    <DashboardLayout>
      <h1>👤 Users Management</h1>

      {users.map((u) => (
        <div key={u.id} style={card}>
          <p><b>{u.full_name}</b></p>
          <p>Role: {u.role}</p>

          <button onClick={() => changeRole(u.id, "admin")}>
            Make Admin
          </button>

          <button onClick={() => changeRole(u.id, "student")}>
            Make Student
          </button>
        </div>
      ))}
    </DashboardLayout>
  )
}

const card: React.CSSProperties = {
  padding: 15,
  marginTop: 10,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
}