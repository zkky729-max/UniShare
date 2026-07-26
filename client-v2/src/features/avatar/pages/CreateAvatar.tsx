import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


import GenderSelector from "../components/GenderSelector";

import AvatarPreview from "../components/AvatarPreview";

import OptionSelector from "../components/OptionSelector";


import {
  avatarOptions,
} from "../data/avatarOptions";


import {
  supabase,
} from "../../../lib/supabaseClient";




export default function CreateAvatar(){


  const navigate = useNavigate();



  const [gender,setGender] = useState("male");

  const [hair,setHair] = useState("hair1");

  const [clothes,setClothes] = useState("student");

  const [accessory,setAccessory] = useState("none");



  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");







  async function saveAvatar(){



    setLoading(true);

    setError("");




    // الحصول على المستخدم الحالي

    const {

      data:{
        user
      }

    } = await supabase.auth.getUser();





    if(!user){


      setError(
        "يجب تسجيل الدخول أولا"
      );


      setLoading(false);

      return;

    }






    // حفظ Avatar


    const {

      data:avatar,

      error:avatarError


    } = await supabase


      .from("avatars")


      .insert({


        user_id:user.id,


        gender,


        hair,


        clothes,


        accessory,


      })


      .select()


      .single();






    if(avatarError){


      setError(
        avatarError.message
      );


      setLoading(false);

      return;


    }






    // ربطه مع profiles



    const {

      error:profileError


    } = await supabase


      .from("profiles")


      .update({


        avatar_id:avatar.id


      })


      .eq(


        "user_id",


        user.id


      );







    if(profileError){


      setError(
        profileError.message
      );


      setLoading(false);

      return;

    }







    navigate(
      "/dashboard"
    );



    setLoading(false);



  }









return (



<div className="
min-h-screen
bg-gray-50
p-5
">



<div className="
max-w-6xl
mx-auto
">





<h1 className="
text-3xl
font-bold
text-center
mb-8
">

🎨 إنشاء شخصية UniShare

</h1>







<div className="
grid
lg:grid-cols-2
gap-8
">







{/* Preview */}



<div>


<AvatarPreview


gender={gender}


hair={hair}


clothes={clothes}


accessory={accessory}


/>


</div>









{/* Settings */}



<div className="
bg-white
rounded-3xl
p-6
shadow
">






<GenderSelector


selected={gender}


onSelect={setGender}


/>









<OptionSelector


title="الشعر"


icon="💇"


items={avatarOptions.hair}


selected={hair}


onSelect={setHair}


/>









<OptionSelector


title="الملابس"


icon="👕"


items={avatarOptions.clothes}


selected={clothes}


onSelect={setClothes}


/>









<OptionSelector


title="الإكسسوارات"


icon="🎧"


items={avatarOptions.accessory}


selected={accessory}


onSelect={setAccessory}


/>









{
error &&

<div className="
bg-red-50
text-red-600
p-3
rounded-xl
mb-4
">

{error}

</div>


}









<button


onClick={saveAvatar}


disabled={loading}


className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
font-bold
transition
"


>



{

loading

?

"جاري الحفظ..."

:

"حفظ الشخصية 🚀"

}



</button>








</div>






</div>




</div>



</div>



);


}