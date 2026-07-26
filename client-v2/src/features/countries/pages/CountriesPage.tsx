import { useEffect, useState } from "react";
import { getCountries } from "../api/countriesApi";
import type { Country } from "../types";
import CountryCard from "../components/CountryCard";

export default function CountriesPage() {
  console.log("CountriesPage loaded");

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getCountries();

        console.log("Countries from Supabase:", data);

        setCountries(data);

      } catch (error) {
        console.error("Error loading countries:", error);

      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        Loading countries...
      </div>
    );
  }

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-6">
        Countries
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {countries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
          />
        ))}

      </div>

    </div>
  );
}