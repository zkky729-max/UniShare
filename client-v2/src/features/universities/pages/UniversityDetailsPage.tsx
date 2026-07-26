import {
  Building2,
  GraduationCap,
  Users,
  ArrowLeft,
  MapPin
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  supabase
} from "../../../lib/supabaseClient";



export default function UniversityDetailsPage(){


  const { universityId } = useParams();

  const navigate = useNavigate();



  const [university,setUniversity]=useState<any>(null);

  const [faculties,setFaculties]=useState<any[]>([]);

  const [loading,setLoading]=useState(true);

  const [error,setError]=useState("");





  // تحقق من UUID

  function isValidUUID(id:string){

    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    .test(id);

  }







  async function loadData(){


    if(!universityId){

      setError("معرف الجامعة غير موجود");

      setLoading(false);

      return;

    }



    console.log(
      "University ID:",
      universityId
    );




    if(!isValidUUID(universityId)){


      console.error(
        "Invalid UUID:",
        universityId
      );


      setError(
        "رابط الجامعة غير صحيح"
      );


      setLoading(false);

      return;

    }







    try{



      // =========================
      // UNIVERSITY
      // =========================


      const {
        data: universityData,
        error: universityError

      } = await supabase


      .from("universities")

      .select("*")

      .eq(
        "id",
        universityId
      )

      .single();





      if(universityError)
        throw universityError;






      setUniversity(
        universityData
      );







      // =========================
      // FACULTIES
      // =========================



      const {

        data: facultiesData,

        error: facultiesError


      } = await supabase


      .from("faculties")

      .select("*")


      .eq(
        "university_id",
        universityId
      )


      .order(
        "created_at",
        {
          ascending:false
        }
      );







      if(facultiesError)
        throw facultiesError;





      console.log(
        "University Faculties:",
        facultiesData
      );




      setFaculties(
        facultiesData || []
      );




    }

    catch(err:any){


      console.error(
        err
      );


      setError(
        err.message ||
        "حدث خطأ"
      );


    }

    finally{


      setLoading(false);


    }



  }









  useEffect(()=>{


    loadData();


  },[universityId]);









  if(loading){


    return (

      <div className="p-6 text-center">

        جاري تحميل الجامعة...

      </div>

    );

  }







  if(error){


    return (

      <div className="p-6">


        <div className="
        bg-red-100
        text-red-700
        p-5
        rounded-xl
        ">

          {error}


        </div>


      </div>

    );


  }









  if(!university){


    return (

      <div className="p-6">

        الجامعة غير موجودة

      </div>

    );


  }









return (

<div className="space-y-8">





{/* HERO */}


<section className="
bg-gradient-to-r
from-blue-600
to-indigo-700
rounded-3xl
p-8
text-white
">


<div className="
flex
items-center
gap-5
">


<div className="
bg-white/20
p-5
rounded-2xl
text-5xl
">

🏛️

</div>




<div>


<h1 className="
text-3xl
md:text-4xl
font-bold
">

{university.name}

</h1>




<div className="
flex
items-center
gap-2
mt-3
text-blue-100
">


<MapPin size={18}/>


{university.country || "الجزائر"}


</div>



</div>


</div>





<p className="
mt-6
text-blue-100
text-lg
">

{university.description ||

"جامعة ضمن منصة UniShare للتعليم الجامعي"}

</p>




</section>









{/* STATS */}



<section className="
grid
grid-cols-1
md:grid-cols-3
gap-5
">



<div className="
bg-white
rounded-2xl
border
p-6
">

<GraduationCap className="text-blue-600"/>


<p className="text-gray-500 mt-3">
عدد الكليات
</p>


<h2 className="text-3xl font-bold">
{faculties.length}
</h2>


</div>






<div className="
bg-white
rounded-2xl
border
p-6
">

<Users className="text-green-600"/>


<p className="text-gray-500 mt-3">
الطلاب
</p>


<h2 className="text-3xl font-bold">
25000+
</h2>


</div>






<div className="
bg-white
rounded-2xl
border
p-6
">


<Building2 className="text-indigo-600"/>


<p className="text-gray-500 mt-3">
المنصة
</p>


<h2 className="text-3xl font-bold">
UniShare
</h2>


</div>



</section>









{/* FACULTIES */}



<section className="
bg-white
rounded-3xl
border
p-6
">


<h2 className="
text-2xl
font-bold
mb-6
">

الكليات 🎓

</h2>





{

faculties.length===0 ?


<p className="text-gray-500">

لا توجد كليات

</p>


:

<div className="
grid
md:grid-cols-2
gap-5
">


{

faculties.map((faculty)=>(


<div
key={faculty.id}

className="
border
rounded-2xl
p-6
hover:shadow-lg
transition
"
>


<GraduationCap
size={35}
className="text-blue-600"
/>



<h3 className="
font-bold
text-lg
mt-4
">

{faculty.name}

</h3>




<p className="
text-gray-500
mt-3
">

{faculty.description}

</p>




<button

onClick={()=>navigate(
`/faculties/${faculty.id}/specialties`
)}

className="
mt-5
bg-blue-600
text-white
px-5
py-2
rounded-xl
flex
items-center
gap-2
hover:bg-blue-700
"

>

دخول الكلية

<ArrowLeft size={18}/>

</button>



</div>


))


}



</div>


}




</section>







</div>

);


}