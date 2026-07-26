import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";


interface Props {
  userId:string;
  currentAvatar:string | null;
  onUploaded:(url:string)=>void;
}


export default function AvatarUpload({
  userId,
  currentAvatar,
  onUploaded
}:Props){


const [loading,setLoading]=useState(false);



async function uploadAvatar(
  e:React.ChangeEvent<HTMLInputElement>
){


const file =
e.target.files?.[0];


if(!file) return;



try{


setLoading(true);



const fileExt =
file.name.split(".").pop();


const fileName =
`${userId}-${Date.now()}.${fileExt}`;



const {
 error:uploadError
}
=
await supabase.storage
.from("avatars")
.upload(
 fileName,
 file,
 {
  upsert:true
 }
);



if(uploadError)
 throw uploadError;




const {
 data
}
=
supabase.storage
.from("avatars")
.getPublicUrl(
 fileName
);



const url =
data.publicUrl;



const {
 error:updateError
}
=
await supabase
.from("profiles")
.update({
 avatar_url:url
})
.eq(
"user_id",
userId
);



if(updateError)
 throw updateError;



onUploaded(url);



alert(
"تم تغيير الصورة بنجاح"
);



}
catch(error){

console.error(error);

alert(
"فشل رفع الصورة"
);

}
finally{

setLoading(false);

}


}





return (

<div className="space-y-3">


<img

src={
currentAvatar ||
"/avatars/default.png"
}

className="
h-32
w-32
rounded-full
object-cover
border
"

/>



<label

className="
cursor-pointer
rounded-xl
bg-blue-600
px-5
py-2
text-white
inline-block
"

>

{
loading
?
"جاري الرفع..."
:
"📷 تغيير الصورة"
}



<input

hidden

type="file"

accept="image/*"

onChange={uploadAvatar}

/>


</label>



</div>

);


}