import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import DashboardLayout from "../../layouts/DashboardLayout"

type Faculty = {
  id: string
  name: string
}

type Specialty = {
  id: string
  name: string
  faculty_id: string
}

export default function SpecialtiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  const [name, setName] = useState("")
  const [facultyId, setFacultyId] = useState("")

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    const [fac, spec] = await Promise.all([
      supabase.from("faculties").select("*"),
      supabase.from("specialties").select("*"),
    ])

    if (fac.error) console.log("FACULTIES ERROR:", fac.error)
    if (spec.error) console.log("SPECIALTIES ERROR:", spec.error)

    setFaculties(fac.data || [])
    setSpecialties(spec.data || [])
  }

  async function addSpecialty() {
    if (!name || !facultyId) {
      alert("❌ أكمل جميع الحقول")
      return
    }

    const { error } = await supabase.from("specialties").insert({
      name,
      faculty_id: facultyId,
    })

    if (error) {
      console.log("INSERT ERROR:", error)
      alert("❌ خطأ في الإضافة")
      return
    }

    setName("")
    setFacultyId("")
    loadAll()
  }

  async function deleteSpecialty(id: string) {
    const { error } = await supabase
      .from("specialties")
      .delete()
      .eq("id", id)

    if (error) {
      console.log("DELETE ERROR:", error)
      alert("❌ لا يمكن الحذف (راجع RLS أو العلاقات)")
      return
    }

    loadAll()
  }

  function getFacultyName(id: string) {
    return faculties.find((f) => f.id === id)?.name || "Unknown"
  }

  return (
    <DashboardLayout>
      <h1>🎓 Specialties Management</h1>

      {/* FORM */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          placeholder="Specialty name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        >
          <option value="">🏛 Faculty</option>
          {faculties.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        <button onClick={addSpecialty}>
          ➕ Add Specialty
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: 20 }}>
        {specialties.length === 0 ? (
          <p>لا توجد تخصصات</p>
        ) : (
          specialties.map((s) => (
            <div key={s.id} style={card}>
              <div>
                <h3>{s.name}</h3>
                <small>🏛 {getFacultyName(s.faculty_id)}</small>
              </div>

              <button onClick={() => deleteSpecialty(s.id)}>
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
  border: "1px solid #eee",
  borderRadius: 10,
  background: "#fff",
}