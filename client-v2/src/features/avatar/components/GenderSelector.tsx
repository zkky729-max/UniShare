import {
  avatarOptions,
} from "../data/avatarOptions";


interface Props {

  selected:string;

  onSelect:(gender:string)=>void;

}



export default function GenderSelector({

  selected,

  onSelect,

}:Props){



  return (

    <div>

      <h3 className="
        text-lg
        font-bold
        mb-4
      ">
        اختر الجنس
      </h3>



      <div className="
        grid
        grid-cols-2
        gap-4
      ">


        {
          avatarOptions.gender.map((item)=>(


            <button


              key={item.id}


              type="button"


              onClick={()=>
                onSelect(item.id)
              }



              className={`
                p-5
                rounded-2xl
                border-4
                transition
                text-center


                ${
                  selected === item.id
                  ?
                  "border-blue-600 bg-blue-50"
                  :
                  "border-gray-200 bg-white"
                }

              `}



            >


              <div className="
                text-5xl
                mb-3
              ">
                {item.icon}
              </div>



              <p className="
                font-semibold
              ">
                {item.name}
              </p>



            </button>


          ))
        }


      </div>


    </div>

  );


}