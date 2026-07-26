import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSemestersByLevel } from "../api/semesters";
import type { Semester } from "../types";

export default function Semesters() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!levelId) return;

    const loadSemesters = async () => {
      try {
        const data = await getSemestersByLevel(levelId);
        setSemesters(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSemesters();
  }, [levelId]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading semesters...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Semesters
      </h1>

      {semesters.length === 0 ? (
        <div className="text-gray-500">
          No semesters found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {semesters.map((semester) => (
            <div
              key={semester.id}
              onClick={() =>
                navigate(`/semesters/${semester.id}/modules`)
              }
              className="cursor-pointer rounded-xl border p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">
                {semester.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Semester {semester.semester_number}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}