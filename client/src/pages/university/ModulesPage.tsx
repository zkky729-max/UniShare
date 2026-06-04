import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Module = {
  id: string;
  name: string;
  semester: string;
};

export default function ModulesPage() {
  const { specialtyId } = useParams();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!specialtyId) return;

    loadModules();
  }, [specialtyId]);

  async function loadModules() {
    setLoading(true);

    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .eq("specialty_id", specialtyId);

    console.log("MODULES =", data);
    console.log("ERROR =", error);

    if (data) {
      setModules(data);
    }

    setLoading(false);
  }

  if (loading) return <h2>Loading modules...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📘 المواد الدراسية</h1>

      {modules.length === 0 ? (
        <p>لا توجد مواد</p>
      ) : (
        modules.map((m) => (
          <div
            key={m.id}
            style={{
              padding: 15,
              margin: 10,
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          >
            <h3>{m.name}</h3>
            <small>📅 {m.semester}</small>
          </div>
        ))
      )}
    </div>
  );
}