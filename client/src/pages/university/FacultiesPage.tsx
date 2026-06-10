import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

type Faculty = {
  id: string
  name: string
}

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [name, setName] = useState("")

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data, error } = await supabase
      .from("faculties")
      .select("*")

    console.log("LOAD FACULTIES:", data)
    console.log("LOAD ERROR:", error)

    setFaculties(data || [])
  }

  async function add() {
    console.log("ADDING:", name)

    const { error } = await supabase
      .from("faculties")
      .insert({ name })

    console.log("INSERT ERROR:", error)

    if (!error) load()
  }

  async function remove(id: string) {
    console.log("DELETE ID:", id)

    const { error } = await supabase
      .from("faculties")
      .delete()
      .eq("id", id)

    console.log("DELETE ERROR:", error)

    if (!error) load()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🏛 Faculties</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Faculty name"
      />

      <button onClick={add}>➕ Add</button>

      {faculties.map((f) => (
        <div key={f.id} style={{ display: "flex", gap: 10 }}>
          <p>{f.name}</p>
          <button onClick={() => remove(f.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  )
}