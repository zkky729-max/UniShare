import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUniversitiesByCountry } from "../../universities/api/universitiesApi";

import type { University } from "../../universities/types";
import UniversityCard from "../../universities/components/UniversityCard";


export default function CountryDetailsPage() {

  const { countryId } = useParams();

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadUniversities() {

      if (!countryId) return;

      try {

        const data = await getUniversitiesByCountry(countryId);

        console.log(
          "Universities by country:",
          data
        );

        setUniversities(data);


      } catch (error) {

        console.error(error);


      } finally {

        setLoading(false);

      }

    }


    loadUniversities();

  }, [countryId]);



  if (loading) {
    return (
      <div className="p-4">
        Loading country...
      </div>
    );
  }



  return (

    <div className="p-4">

      <h1 className="text-2xl font-bold mb-6">
        Universities
      </h1>


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {universities.map((university) => (

          <UniversityCard
            key={university.id}
            university={university}
          />

        ))}


      </div>


    </div>

  );

}