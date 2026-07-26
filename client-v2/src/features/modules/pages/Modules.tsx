import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getModulesBySemester } from "../api/modules";
import type { Module } from "../types";

export default function Modules() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!semesterId) return;

    loadModules();
  }, [semesterId]);

  async function loadModules() {
    try {
      const data = await getModulesBySemester(semesterId!);
      setModules(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading modules...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Modules
      </h1>

      {modules.length === 0 ? (
        <div className="text-gray-500">
          No modules found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {modules.map((module) => (

            <div
              key={module.id}
              onClick={() =>
                navigate(`/modules/${module.id}/subjects`)
              }
              className="cursor-pointer rounded-xl border p-5 hover:shadow-lg transition"
            >

              <h2 className="text-xl font-semibold">
                {module.name}
              </h2>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}