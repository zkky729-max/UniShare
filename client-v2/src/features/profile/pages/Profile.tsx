import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

import PostCard from "../../posts/components/PostCard";
import type { Post } from "../../posts/types/post";


interface ProfileData {
  full_name: string | null;
  username: string | null;
  bio: string | null;
  age: number | null;
  avatar_url: string | null;
  faculty_id: string | null;
  specialty_id: string | null;
}


export default function Profile() {

  const navigate = useNavigate();


  const [profile,setProfile] =
    useState<ProfileData | null>(null);


  const [faculty,setFaculty] =
    useState("");

  const [specialty,setSpecialty] =
    useState("");


  const [posts,setPosts] =
    useState<Post[]>([]);


  const [postsCount,setPostsCount] =
    useState(0);



  useEffect(()=>{

    loadProfile();

  },[]);



  async function loadProfile(){

    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user){

      navigate("/login");

      return;

    }



    const {
      data,
      error
    } = await supabase
      .from("profiles")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .single();



    if(error){

      console.error(
        "Profile error:",
        error.message
      );

      return;

    }



    setProfile(data);



    // الكلية

    if(data.faculty_id){

      const {
        data:facultyData
      } = await supabase
      .from("faculties")
      .select("name")
      .eq(
        "id",
        data.faculty_id
      )
      .single();


      setFaculty(
        facultyData?.name ?? ""
      );

    }




    // التخصص

    if(data.specialty_id){

      const {
        data:specialtyData
      } = await supabase
      .from("specialties")
      .select("name")
      .eq(
        "id",
        data.specialty_id
      )
      .single();



      setSpecialty(
        specialtyData?.name ?? ""
      );

    }




    // عدد المنشورات

    const {
      count
    } = await supabase
    .from("posts")
    .select("*",
    {
      count:"exact",
      head:true
    })
    .eq(
      "user_id",
      user.id
    );


    setPostsCount(
      count ?? 0
    );




    // المنشورات

    const {
      data:postsData
    } = await supabase
    .from("posts")
    .select("*")
    .eq(
      "user_id",
      user.id
    )
    .order(
      "created_at",
      {
        ascending:false
      }
    );



    setPosts(
      (postsData ?? []).map((post:any)=>({

        id:post.id,

        content:post.content,

        image:
        post.image_url ?? undefined,

        pdf:
        post.pdf_url ?? undefined,


        createdAt:
        new Date(
          post.created_at
        )
        .toLocaleString("ar-DZ"),


        likes:0,
        comments:0,
        shares:0,


        author:{

          id:user.id,

          name:
          data.full_name ??
          "مستخدم",


          avatar:
          data.avatar_url ??
          undefined,


          role:"Student"

        }


      }))
    );


  }



  if(!profile){

    return (

      <div className="p-10 text-center">
        جاري تحميل الملف الشخصي...
      </div>

    );

  }



  return (

<div className="mx-auto max-w-5xl space-y-6">


<div className="h-56 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600"/>



<div className="-mt-20 rounded-2xl bg-white p-6 shadow">


<div className="flex flex-col gap-5 md:flex-row">


<img

src={
profile.avatar_url ||
"/avatars/default.png"
}

onError={(e)=>
e.currentTarget.src="/avatars/default.png"
}

className="h-32 w-32 rounded-full border-4 object-cover"

/>



<div>


<h1 className="text-3xl font-bold">

{profile.full_name || "مستخدم"}

</h1>


<p className="text-gray-500">

@{profile.username || "username"}

</p>



<p>
🎓 {faculty || "-"}
</p>


<p>
📚 {specialty || "-"}
</p>


<p>
🎂 {profile.age ?? "-"} سنة
</p>


</div>


</div>



<div className="mt-5 rounded-xl bg-gray-50 p-4">

{profile.bio || "لا توجد نبذة"}

</div>



<button

onClick={()=>
navigate("/profile/edit")
}

className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white"

>

✏️ تعديل الملف الشخصي

</button>



</div>





<div className="rounded-xl bg-white p-5 shadow">

<h2 className="text-2xl font-bold">

منشوراتي ({postsCount})

</h2>


</div>





{
posts.map(post=>(

<PostCard

key={post.id}

post={post}

/>

))

}



</div>

  );

}