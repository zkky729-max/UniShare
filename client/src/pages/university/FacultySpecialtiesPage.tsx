import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Specialty = {
  id: string;
  name: string;
  faculty_id: string;
};

export default function FacultySpecialtiesPage() {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facultyId) return;
    loadSpecialties();
  }, [facultyId]);

  async function loadSpecialties() {
    setLoading(true);

    const { data, error } = await supabase
      .from("specialties")
      .select("*")
      .eq("faculty_id", facultyId);

    console.log("SPECIALTIES =", data);
    console.log("ERROR =", error);

    if (!error) {
      setSpecialties(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2>Loading specialties...</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 التخصصات</h1>

      <p>عدد التخصصات: {specialties.length}</p>

      {specialties.length === 0 ? (
        <p>لا توجد تخصصات</p>
      ) : (
        specialties.map((specialty) => (
          <div
            key={specialty.id}
            onClick={() =>
              navigate(`/modules/${specialty.id}`)
            }
            style={{
              padding: 15,
              marginTop: 10,
              border: "1px solid #ddd",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <h3>{specialty.name}</h3>
          </div>
        ))
      )}
    </div>
  );
}