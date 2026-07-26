import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getLevelsBySpecialty,
  addLevel,
  deleteLevel,
} from "../api/levels";

import type { Level } from "../types";


export default function Levels() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [levels, setLevels] = useState<Level[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);



  async function loadLevels() {

    if (!id) return;

    const data = await getLevelsBySpecialty(id);

    setLevels(data);

  }



  useEffect(() => {

    async function load() {

      await loadLevels();

      setLoading(false);

    }

    load();

  }, [id]);





  async function handleAdd() {

    if (!id || !name.trim()) return;


    await addLevel({

      name: name.trim(),

      description:
        description.trim() || null,

      specialty_id: id,

    });


    setName("");
    setDescription("");


    loadLevels();

  }





  async function handleDelete(levelId:string) {

    await deleteLevel(levelId);

    loadLevels();

  }





  if (loading) {

    return (
      <div className="p-4">
        Loading levels...
      </div>
    );

  }





  return (

    <div className="space-y-6">


      <h1 className="text-2xl font-bold">
        Levels 🎓
      </h1>



      {/* Add Level */}

      <div className="
        bg-white
        border
        rounded-xl
        p-4
        space-y-3
      ">


        <input

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

          placeholder="Level name (L1, L2, L3, M1...)"

          className="
            w-full
            border
            rounded
            p-2
          "

        />



        <input

          value={description}

          onChange={(e)=>
            setDescription(e.target.value)
          }

          placeholder="Description"

          className="
            w-full
            border
            rounded
            p-2
          "

        />



        <button

          onClick={handleAdd}

          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "

        >

          Add Level

        </button>


      </div>






      {/* Levels List */}


      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">


        {
          levels.map((level)=>(


            <div

              key={level.id}

              className="
                border
                rounded-xl
                p-5
                bg-white
              "

            >


              <h2 className="
                font-bold
                text-lg
              ">

                {level.name}

              </h2>



              {
                level.description &&

                <p className="
                  text-gray-500
                  text-sm
                ">

                  {level.description}

                </p>

              }




              <div className="
                flex
                gap-3
                mt-4
              ">


                <button

                  onClick={()=>
                    navigate(
                      `/levels/${level.id}/semesters`
                    )
                  }

                  className="
                    bg-green-600
                    text-white
                    px-3
                    py-1
                    rounded
                  "

                >

                  Semesters

                </button>




                <button

                  onClick={()=>
                    handleDelete(level.id)
                  }

                  className="
                    bg-red-600
                    text-white
                    px-3
                    py-1
                    rounded
                  "

                >

                  Delete

                </button>



              </div>



            </div>


          ))
        }


      </div>



    </div>

  );

}