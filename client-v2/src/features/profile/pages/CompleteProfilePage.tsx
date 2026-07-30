import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

interface Faculty {
  id: string;
  name: string;
}

interface Specialty {
  id: string;
  name: string;
}

export default function CompleteProfilePage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");

  const [username, setUsername] = useState("");

  const [age, setAge] = useState("");

  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const [facultyId, setFacultyId] = useState("");

  const [specialtyId, setSpecialtyId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      setFullName(user.user_metadata?.full_name ?? "");

      const { data, error } = await supabase
        .from("faculties")
        .select("id,name")
        .order("name");

      if (error) {
        console.error(error);
        return;
      }

      setFaculties(data ?? []);
    }

    init();
  }, [navigate]);

  async function loadSpecialties(id: string) {
    setFacultyId(id);

    setSpecialtyId("");

    const { data, error } = await supabase
      .from("specialties")
      .select("id,name")
      .eq("faculty_id", id)
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setSpecialties(data ?? []);
  }

  async function saveProfile() {
    if (
      !username ||
      !age ||
      !facultyId ||
      !specialtyId
    ) {
      alert("أكمل جميع المعلومات");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: userId,
            full_name: fullName,
            username,
            age: Number(age),
            faculty_id: facultyId,
            specialty_id: specialtyId,
            role: "student",
          },
          {
            onConflict: "user_id",
          }
        );

      if (error) throw error;

      alert("تم حفظ الملف الشخصي ✅");

      navigate("/dashboard");
    } catch (error: any) {
      console.error("PROFILE ERROR:", error);

      alert(
        error?.message ??
          "فشل حفظ الملف الشخصي"
      );
    } finally {
      setLoading(false);
    }
  }
    return (
    <div
      className="
      max-w-xl
      mx-auto
      p-6
      space-y-5
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        "
      >
        أكمل ملفك الشخصي 🎓
      </h1>

      <input
        placeholder="اسم المستخدم"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      />

      <input
        type="number"
        placeholder="العمر"
        value={age}
        onChange={(e) =>
          setAge(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      />

      <select
        value={facultyId}
        onChange={(e) =>
          loadSpecialties(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      >
        <option value="">
          اختر الكلية
        </option>

        {faculties.map((faculty) => (
          <option
            key={faculty.id}
            value={faculty.id}
          >
            {faculty.name}
          </option>
        ))}
      </select>

      <select
        disabled={!facultyId}
        value={specialtyId}
        onChange={(e) =>
          setSpecialtyId(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      >
        <option value="">
          اختر التخصص
        </option>

        {specialties.map((specialty) => (
          <option
            key={specialty.id}
            value={specialty.id}
          >
            {specialty.name}
          </option>
        ))}
      </select>

      <button
        onClick={saveProfile}
        disabled={loading}
        className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        rounded-xl
        py-3
        font-bold
        disabled:opacity-50
        "
      >
        {loading
          ? "جاري الحفظ..."
          : "حفظ الملف الشخصي"}
      </button>
    </div>
  );
}