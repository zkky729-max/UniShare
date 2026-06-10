import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Level = {
  id: string;
  name: string;
  faculty_id: string;
};

export default function LevelsPage() {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facultyId) {
      console.log("FACULTY ID IS UNDEFINED");
      setLoading(false);
      return;
    }

    loadLevels();
  }, [facultyId]);

  async function loadLevels() {
    setLoading(true);

    console.log("FACULTY ID =", facultyId);

    const { data, error } = await supabase
      .from("academic_levels")
      .select("*")
      .eq("faculty_id", facultyId)
      .order("name");

    console.log("LEVELS =", data);
    console.log("ERROR =", error);

    if (!error) {
      setLevels(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2>Loading levels...</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 السنوات الدراسية</h1>

      <p>
        <strong>Faculty ID:</strong> {facultyId}
      </p>

      <p>
        <strong>عدد السنوات:</strong> {levels.length}
      </p>

      {levels.length === 0 ? (
        <p>لا توجد سنوات لهذه الكلية</p>
      ) : (
        levels.map((level) => (
          <div
            key={level.id}
            onClick={() => navigate(`/specialties/${level.id}`)}
            style={{
              padding: 15,
              marginTop: 10,
              border: "1px solid #ddd",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <h3>{level.name}</h3>

            <small>
              Level ID: {level.id}
            </small>
          </div>
        ))
      )}
    </div>
  );
}