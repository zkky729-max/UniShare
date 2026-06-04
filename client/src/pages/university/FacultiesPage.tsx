import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Faculty = {
  id: string;
  name: string;
};

export default function FacultiesPage() {
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculties();
  }, []);

  async function loadFaculties() {
    const { data, error } = await supabase
      .from("faculties")
      .select("*")
      .order("name");

    console.log("FACULTIES DATA =", data);
    console.log("FACULTIES ERROR =", error);

    if (!error) {
      setFaculties(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2>Loading faculties...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏛 الكليات</h1>

      <p>عدد الكليات: {faculties.length}</p>

      {faculties.map((faculty) => (
        <div
          key={faculty.id}
          onClick={() => navigate(`/specialties/${faculty.id}`)}
          style={{
            padding: "15px",
            marginTop: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{faculty.name}</h3>
        </div>
      ))}
    </div>
  );
}