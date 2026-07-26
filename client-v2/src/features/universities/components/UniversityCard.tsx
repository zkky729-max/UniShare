import { useNavigate } from "react-router-dom";
import type { University } from "../types";

interface Props {
  university: University;
}

export default function UniversityCard({
  university,
}: Props) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/universities/${university.id}`)
      }
      className="
        cursor-pointer
        rounded-xl
        border
        p-4
        shadow-sm
        hover:shadow-md
        transition
      "
    >

      <div className="text-3xl mb-3">
        🏛️
      </div>

      <h2 className="font-semibold text-lg">
        {university.name}
      </h2>

      {university.city && (
        <p className="text-sm text-gray-500">
          {university.city}
        </p>
      )}

    </div>
  );
}