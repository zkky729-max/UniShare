import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ================= SPECIALTIES API ================= */
import {
  getSpecialtiesByFaculty,
  addSpecialty,
  deleteSpecialty,
} from "../api/specialties";


export default function Specialties() {

  const { id } = useParams();
  const navigate = useNavigate();


  /* ================= SPECIALTIES ================= */

  const [specialties, setSpecialties] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");


  const [loading, setLoading] = useState(true);



  /* ================= LOAD SPECIALTIES ================= */


  async function loadSpecialties() {

    if (!id) return;


    try {

      const data =
        await getSpecialtiesByFaculty(id);


      console.log(
        "Specialties:",
        data
      );


      setSpecialties(
        data || []
      );


    } catch (error) {

      console.error(
        "Load specialties error:",
        error
      );

    }

  }



  useEffect(() => {


    loadSpecialties()
      .finally(() =>
        setLoading(false)
      );


  }, [id]);





  /* ================= ADD SPECIALTY ================= */


  async function handleAddSpecialty() {


    if (
      !id ||
      !name.trim()
    ) return;



    try {


      await addSpecialty(
        name,
        description,
        id
      );



      setName("");

      setDescription("");



      loadSpecialties();



    } catch(error) {


      console.error(
        "Add specialty error:",
        error
      );


    }

  }





  /* ================= DELETE SPECIALTY ================= */


  async function handleDeleteSpecialty(
    specialtyId:string
  ) {


    try {


      await deleteSpecialty(
        specialtyId
      );


      loadSpecialties();



    } catch(error) {


      console.error(
        "Delete specialty error:",
        error
      );


    }

  }






  /* ================= LOADING ================= */


  if(loading){

    return (

      <div className="p-6 text-center">

        Loading specialties...

      </div>

    );

  }







  return (

    <div className="space-y-6">



      <h1 className="text-2xl font-bold">

        Faculty Dashboard 🎓

      </h1>





      {/* ================= ADD FORM ================= */}


      <div
        className="
          bg-white
          p-4
          border
          rounded-xl
          space-y-3
        "
      >



        <input

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

          placeholder="Specialty name"

          className="
            w-full
            border
            p-2
            rounded
          "

        />





        <input


          value={description}


          onChange={(e)=>
            setDescription(
              e.target.value
            )
          }


          placeholder="Description"


          className="
            w-full
            border
            p-2
            rounded
          "

        />





        <button


          onClick={handleAddSpecialty}


          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded
          "

        >

          Add Specialty

        </button>




      </div>









      {/* ================= LIST ================= */}



      {
        specialties.length === 0 ? (


          <div className="text-gray-500">


            No specialties found.


          </div>



        ) : (



          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >




            {
              specialties.map(
                (s)=> (



                <div


                  key={s.id}


                  className="
                    bg-white
                    border
                    p-4
                    rounded-xl
                    space-y-3
                  "


                >




                  <h2
                    className="
                      font-bold
                      text-lg
                    "
                  >

                    {s.name}


                  </h2>





                  <p
                    className="
                      text-gray-500
                      text-sm
                    "
                  >

                    {s.description}


                  </p>







                  <div
                    className="
                      flex
                      gap-3
                    "
                  >



                    <button


                      onClick={()=>
                        navigate(
                          `/specialties/${s.id}/levels`
                        )
                      }


                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "


                    >

                      View Levels


                    </button>







                    <button


                      onClick={()=>
                        handleDeleteSpecialty(
                          s.id
                        )
                      }


                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "


                    >

                      Delete


                    </button>




                  </div>





                </div>



              ))

            }




          </div>



        )

      }





    </div>


  );

}