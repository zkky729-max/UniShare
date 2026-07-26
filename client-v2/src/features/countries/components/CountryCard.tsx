import { useNavigate } from "react-router-dom";
import type { Country } from "../types";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/countries/${country.id}`)}
      className="cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition"
    >

      <div className="text-4xl mb-3">
        {country.flag || "🌍"}
      </div>

      <h2 className="text-lg font-semibold">
        {country.name}
      </h2>

      <p className="text-sm text-gray-500">
        Code: {country.code}
      </p>

    </div>
  );
}