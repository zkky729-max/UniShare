import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import DashboardLayout from "../../layouts/DashboardLayout"

type Year = {
  id: string
  name: string
}

export default function YearsPage() {
  const [years, setYears] = useState<Year[]>([])
  const [name, setName] = useState("")

  useEffect(() => {
    loadYears()
  }, [])

  async function loadYears() {
    const { data, error } = await supabase
      .from("years")
      .select("*")

    if (error) console.log("YEARS ERROR:", error)

    setYears(data || [])
  }

  async function addYear() {
    if (!name) return

    const { error } = await supabase.from("years").insert({
      name,
    })

    if (error) {
      console.log("INSERT YEAR ERROR:", error)
      return
    }

    setName("")
    loadYears()
  }

  async function deleteYear(id: string) {
    await supabase.from("years").delete().eq("id", id)
    loadYears()
  }

  return (
    <DashboardLayout>
      <h1>📚 Years Management</h1>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Year name (L1, L2, M1...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addYear}>
          ➕ Add Year
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: 20 }}>
        {years.length === 0 ? (
          <p>لا توجد سنوات</p>
        ) : (
          years.map((y) => (
            <div key={y.id} style={card}>
              <span>{y.name}</span>

              <button onClick={() => deleteYear(y.id)}>
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}

const card: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: 12,
  marginTop: 10,
  background: "#fff",
  borderRadius: 10,
}