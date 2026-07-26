import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

interface Specialty {
  id: string;
  name: string;
}

export default function FacultyDetailsPage() {

  const { id } = useParams();

  const [specialties, setSpecialties] = useState<Specialty[]>([]);


  useEffect(() => {

    async function loadSpecialties() {

      if (!id) return;


      const { data, error } = await supabase
        .from("specialties")
        .select("*")
        .eq("faculty_id", id)
        .order("name");


      if (error) {
        console.error(error);
        return;
      }


      setSpecialties(data || []);

    }


    loadSpecialties();

  }, [id]);


  return (

    <div className="p-4">

      <h1 className="text-2xl font-bold mb-6">
        Specialties
      </h1>


      <div className="grid gap-4">

        {specialties.map((specialty)=>(

          <div
            key={specialty.id}
            className="
              border
              rounded-xl
              p-4
            "
          >
            📚 {specialty.name}
          </div>

        ))}

      </div>

    </div>

  );
}