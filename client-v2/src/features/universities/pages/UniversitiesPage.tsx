import {
  Building2,
  MapPin,
  ArrowLeft
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  supabase
} from "../../../lib/supabaseClient";



export default function UniversitiesPage(){


const navigate = useNavigate();


const [universities,setUniversities]=useState<any[]>([]);

const [loading,setLoading]=useState(true);





async function loadUniversities(){


  const {
    data,
    error

  } = await supabase

  .from("universities")

  .select("*")

  .order(
    "created_at",
    {
      ascending:false
    }
  );




  if(error){

    console.error(
      "Universities error:",
      error
    );

    return;

  }



  console.log(
    "Universities:",
    data
  );



  setUniversities(
    data || []
  );



}






useEffect(()=>{


  loadUniversities()
  .finally(()=>setLoading(false));


},[]);








if(loading){


return (

<div className="p-6 text-center">

جاري تحميل الجامعات...

</div>

);


}








return (


<div className="space-y-8">






<section

className="
bg-gradient-to-r
from-blue-600
to-indigo-700
rounded-3xl
p-8
text-white
"

>


<h1

className="
text-4xl
font-bold
"

>

الجامعات 🎓

</h1>



<p

className="
mt-3
text-blue-100
text-lg
"

>

استكشف الجامعات والكليات والتخصصات في UniShare

</p>



</section>









<section

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"

>


{


universities.map((uni)=>(


<div

key={uni.id}

className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-xl
transition
"

>



<div

className="
flex
justify-between
items-center
"

>


<div className="text-5xl">

🎓

</div>



<Building2

className="text-blue-600"

size={35}

/>


</div>







<h2

className="
text-xl
font-bold
mt-6
"

>

{uni.name}

</h2>







<div

className="
flex
items-center
gap-2
text-gray-500
mt-3
"

>

<MapPin size={18}/>


{uni.country || "الجزائر"}


</div>







<p

className="
text-gray-600
mt-4
"

>

{uni.description ||

"جامعة ضمن منصة UniShare"}

</p>








<button


onClick={()=>{

console.log(
"University selected:",
uni
);


navigate(
`/universities/${uni.id}`
);


}}


className="
mt-6
w-full
bg-blue-600
text-white
py-3
rounded-xl
flex
justify-center
items-center
gap-2
hover:bg-blue-700
"

>


دخول الجامعة


<ArrowLeft size={18}/>


</button>






</div>


))


}





</section>






</div>


);


}