import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import DashboardLayout from "../../layouts/DashboardLayout";

type Specialty = {
  id: string;
  name: string;
};

type Year = {
  id: string;
  name: string;
};

type Semester = {
  id: string;
  name: string;
};

type Module = {
  id: string;
  name: string;
  specialty_id: string;
  year_id: string | null;
  semester_id: string | null;
};

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const [name, setName] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [yearId, setYearId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const [sp, yr, sm, md] = await Promise.all([
      supabase.from("specialties").select("*").order("name"),
      supabase.from("years").select("*").order("name"),
      supabase.from("semesters").select("*").order("name"),
      supabase.from("modules").select("*").order("name"),
    ]);

    console.log("SPECIALTIES:", sp.data, sp.error);
    console.log("YEARS:", yr.data, yr.error);
    console.log("SEMESTERS:", sm.data, sm.error);
    console.log("MODULES:", md.data, md.error);

    setSpecialties(sp.data || []);
    setYears(yr.data || []);
    setSemesters(sm.data || []);
    setModules(md.data || []);
  }

  async function addModule() {
    if (!name || !specialtyId || !yearId || !semesterId) {
      alert("❌ أكمل جميع الحقول");
      return;
    }

    const payload = {
      name,
      specialty_id: specialtyId,
      year_id: yearId,
      semester_id: semesterId,
    };

    console.log("INSERT PAYLOAD:", payload);

    const { data, error } = await supabase
      .from("modules")
      .insert([payload])
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setSpecialtyId("");
    setYearId("");
    setSemesterId("");

    loadAll();
  }

  async function deleteModule(id: string) {
    const confirmed = window.confirm("هل تريد حذف المادة؟");

    if (!confirmed) return;

    const { error } = await supabase
      .from("modules")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadAll();
  }

  const getSpecialtyName = (id: string) =>
    specialties.find((s) => s.id === id)?.name || "Unknown";

  const getYearName = (id: string | null) =>
    years.find((y) => y.id === id)?.name || "-";

  const getSemesterName = (id: string | null) =>
    semesters.find((s) => s.id === id)?.name || "-";

  return (
    <DashboardLayout>
      <div style={{ padding: 20 }}>
        <h1>📘 إدارة المواد</h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <input
            type="text"
            placeholder="اسم المادة"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={specialtyId}
            onChange={(e) => setSpecialtyId(e.target.value)}
          >
            <option value="">🎓 اختر التخصص</option>

            {specialties.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={yearId}
            onChange={(e) => setYearId(e.target.value)}
          >
            <option value="">📚 اختر السنة</option>

            {years.map((y) => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>

          <select
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
          >
            <option value="">📅 اختر السداسي</option>

            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button onClick={addModule}>
            ➕ إضافة مادة
          </button>
        </div>

        {modules.length === 0 ? (
          <p>لا توجد مواد</p>
        ) : (
          modules.map((module) => (
            <div
              key={module.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 15,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{module.name}</h3>

                <p>
                  🎓 {getSpecialtyName(module.specialty_id)}
                </p>

                <p>
                  📚 {getYearName(module.year_id)}
                </p>

                <p>
                  📅 {getSemesterName(module.semester_id)}
                </p>
              </div>

              <button onClick={() => deleteModule(module.id)}>
                🗑 حذف
              </button>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}