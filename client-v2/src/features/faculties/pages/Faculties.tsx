import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getFaculties,
  getFacultiesByUniversity,
} from "../api/faculties";


export default function Faculties() {

  const { universityId } = useParams();

  const navigate = useNavigate();


  const [faculties, setFaculties] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function loadFaculties() {


      try {


        let data;



        // إذا دخلنا من جامعة محددة

        if (universityId) {


          data = await getFacultiesByUniversity(
            universityId
          );


          console.log(
            "Faculties by university:",
            data
          );


        } 
        
        // إذا دخلنا من Dashboard

        else {


          data = await getFaculties();


          console.log(
            "All Faculties:",
            data
          );


        }



        setFaculties(
          data || []
        );



      } catch(error) {


        console.error(
          "Faculties loading error:",
          error
        );


      } finally {


        setLoading(false);


      }

    }



    loadFaculties();



  }, [universityId]);





  if (loading) {


    return (

      <div className="p-6 text-center">

        Loading faculties...

      </div>

    );

  }





  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Faculties 🎓

      </h1>





      {faculties.length === 0 ? (


        <div className="text-gray-500">

          No faculties found.

        </div>


      ) : (


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >



          {faculties.map((faculty) => (



            <div

              key={faculty.id}

              onClick={() =>
                navigate(
                  `/faculties/${faculty.id}/specialties`
                )
              }


              className="
                cursor-pointer
                rounded-xl
                border
                p-5
                hover:shadow-lg
                transition
              "

            >


              <div className="text-3xl mb-3">

                🏫

              </div>



              <h2 className="text-xl font-semibold">

                {faculty.name}

              </h2>



            </div>



          ))}



        </div>


      )}



    </div>

  );

}