import { useNavigate } from "react-router-dom";
import type { Faculty } from "../types";

interface Props {
  faculty: Faculty;
}

export default function FacultyCard({
  faculty,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/faculties/${faculty.id}/specialties`)
      }
      className="
        cursor-pointer
        rounded-xl
        border
        p-4
        shadow-sm
        hover:shadow-lg
        transition
      "
    >
      <div className="text-3xl mb-3">
        🏫
      </div>

      <h2 className="text-lg font-semibold">
        {faculty.name}
      </h2>
    </div>
  );
}