import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";


interface Faculty {
  id: string;
  name: string;
}


interface Specialty {
  id: string;
  name: string;
}



export default function CompleteProfilePage() {

  const navigate = useNavigate();


  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");

  const [username, setUsername] = useState("");

  const [age, setAge] = useState("");


  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);


  const [preview, setPreview] =
    useState("");



  const [faculties, setFaculties] =
    useState<Faculty[]>([]);


  const [specialties, setSpecialties] =
    useState<Specialty[]>([]);



  const [facultyId, setFacultyId] =
    useState("");


  const [specialtyId, setSpecialtyId] =
    useState("");



  const [loading, setLoading] =
    useState(false);





  useEffect(() => {


    async function init(){


      const {
        data:{user}
      } = await supabase.auth.getUser();



      if(!user){

        navigate("/login");

        return;

      }



      setUserId(user.id);


      setFullName(
        user.user_metadata?.full_name || ""
      );




      const {
        data,
        error
      } =
      await supabase
      .from("faculties")
      .select("id,name")
      .order("name");



      if(error){

        console.error(error);

        return;

      }



      setFaculties(data || []);


    }



    init();


  }, [navigate]);







  async function loadSpecialties(
    id:string
  ){


    setFacultyId(id);

    setSpecialtyId("");



    const {
      data,
      error
    } =
    await supabase
    .from("specialties")
    .select("id,name")
    .eq(
      "faculty_id",
      id
    )
    .order("name");



    if(error){

      console.error(error);

      return;

    }


    setSpecialties(data || []);


  }








  function selectImage(
    e:React.ChangeEvent<HTMLInputElement>
  ){


    const file =
    e.target.files?.[0];


    if(!file)
      return;



    if(!file.type.startsWith("image/")){

      alert("اختر صورة فقط");

      return;

    }



    if(file.size > 5 * 1024 * 1024){

      alert("حجم الصورة أكبر من 5MB");

      return;

    }



    setAvatarFile(file);


    setPreview(
      URL.createObjectURL(file)
    );


  }









  async function saveProfile(){



    if(
      !username ||
      !age ||
      !facultyId ||
      !specialtyId
    ){

      alert(
        "أكمل جميع المعلومات"
      );

      return;

    }





    try{


      setLoading(true);



      let avatarUrl:string | null = null;





      if(avatarFile){



        const ext =
        avatarFile.name.split(".").pop();



        const fileName =
        `${userId}-${Date.now()}.${ext}`;




        const {
          error
        } =
        await supabase.storage
        .from("avatars")
        .upload(
          fileName,
          avatarFile,
          {
            upsert:true
          }
        );




        if(error)
          throw error;





        avatarUrl =
        supabase.storage
        .from("avatars")
        .getPublicUrl(fileName)
        .data
        .publicUrl;



      }







      const {
        error
      } =
      await supabase
      .from("profiles")
      .upsert(

        {

          user_id:userId,

          full_name:fullName,

          username,

          age:Number(age),

          faculty_id:facultyId,

          specialty_id:specialtyId,

          avatar_url:avatarUrl,

          role:"student"

        },


        {
          onConflict:"user_id"
        }

      );







      if(error)
        throw error;





      alert(
        "تم حفظ الملف الشخصي ✅"
      );



      navigate("/dashboard");





    }
    catch(error){


      console.error(
        "PROFILE ERROR:",
        error
      );


      alert(
        "فشل حفظ الملف الشخصي"
      );


    }
    finally{


      setLoading(false);


    }


  }









  return (

    <div className="
    max-w-xl
    mx-auto
    p-6
    space-y-5
    ">


      <h1 className="
      text-3xl
      font-bold
      ">

        أكمل ملفك الشخصي 🎓

      </h1>





      {
        preview &&

        <img
          src={preview}
          className="
          w-32
          h-32
          rounded-full
          object-cover
          "
        />
      }





      <input
        type="file"
        accept="image/*"
        onChange={selectImage}
      />






      <input
        placeholder="اسم المستخدم"
        value={username}
        onChange={
          e=>setUsername(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      />






      <input
        type="number"
        placeholder="العمر"
        value={age}
        onChange={
          e=>setAge(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      />






      <select
        value={facultyId}
        onChange={
          e=>loadSpecialties(
            e.target.value
          )
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      >

        <option value="">
          اختر الكلية
        </option>


        {
          faculties.map(f=>(

            <option
              key={f.id}
              value={f.id}
            >
              {f.name}
            </option>

          ))
        }


      </select>








      <select
        disabled={!facultyId}
        value={specialtyId}
        onChange={
          e=>setSpecialtyId(
            e.target.value
          )
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        "
      >

        <option value="">
          اختر التخصص
        </option>


        {
          specialties.map(s=>(

            <option
              key={s.id}
              value={s.id}
            >

              {s.name}

            </option>

          ))
        }


      </select>








      <button
        onClick={saveProfile}
        disabled={loading}
        className="
        w-full
        bg-blue-600
        text-white
        rounded-xl
        py-3
        font-bold
        "
      >

        {
          loading
          ?
          "جاري الحفظ..."
          :
          "حفظ الملف الشخصي"
        }


      </button>




    </div>

  );

}