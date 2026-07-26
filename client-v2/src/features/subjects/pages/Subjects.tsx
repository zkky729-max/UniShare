import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getSubjectsBySpecialty,
  addSubject,
  deleteSubject,
} from "../api/subjects";

export default function Subjects() {
  const { id } = useParams(); // specialty id

  const [subjects, setSubjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!id) return;

    const data = await getSubjectsBySpecialty(id);
    setSubjects(data || []);
  }

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [id]);

  async function handleAdd() {
    if (!id || !name.trim()) return;

    await addSubject(name, description, id);

    setName("");
    setDescription("");

    load();
  }

  async function handleDelete(subjectId: string) {
    await deleteSubject(subjectId);
    load();
  }

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Subjects 📘
      </h1>

      {/* Add form */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subject name"
          className="w-full border p-2 rounded"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Subject
        </button>

      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="bg-white p-5 rounded-xl border shadow-sm space-y-2"
          >
            <h2 className="font-semibold text-lg">
              {sub.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {sub.description}
            </p>

            <button
              onClick={() => handleDelete(sub.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}