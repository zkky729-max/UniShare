import { useEffect, useState } from "react";
import { Image, FileText, Send, X } from "lucide-react";

import { createPost } from "../api/createPost";


interface Props {
  onSuccess: () => void;
}


export default function CreatePost({
  onSuccess,
}: Props) {


  const [content, setContent] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");



  const imagePreview = image
    ? URL.createObjectURL(image)
    : null;



  useEffect(() => {

    return () => {

      if(imagePreview){

        URL.revokeObjectURL(imagePreview);

      }

    };

  },[imagePreview]);





  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(!file) return;



    if(!file.type.startsWith("image/")){

      alert("اختر صورة فقط");

      return;

    }



    setImage(file);

  }







  function handlePdfChange(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(!file) return;



    if(file.type !== "application/pdf"){

      alert("اختر ملف PDF فقط");

      return;

    }



    setPdf(file);

  }







  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();



    if(
      !content.trim()
      &&
      !image
      &&
      !pdf
    ){

      return;

    }



    try{


      setLoading(true);

      setMessage("");



      await createPost({

        content,

        image,

        pdf,

      });



      setContent("");

      setImage(null);

      setPdf(null);



      setMessage(
        "✅ تم نشر المنشور بنجاح"
      );



      onSuccess();



    }

    catch(error:any){


      console.error(
        "Create post error:",
        error
      );


      alert(
        error.message ||
        "فشل نشر المنشور"
      );


    }

    finally{


      setLoading(false);


    }

  }






return (

<form

onSubmit={handleSubmit}

className="
rounded-2xl
border
bg-white
p-5
shadow-sm
space-y-4
"

>



<textarea

rows={4}

placeholder="بماذا تفكر؟"

value={content}

onChange={
e=>setContent(e.target.value)
}

className="
w-full
rounded-xl
border
p-4
focus:ring-2
focus:ring-blue-500
"

 />






{
imagePreview && (

<div className="relative">

<img

src={imagePreview}

alt="preview"

className="
w-full
rounded-xl
max-h-96
object-cover
"

/>



<button

type="button"

onClick={()=>{
setImage(null)
}}

className="
absolute
right-2
top-2
rounded-full
bg-white
p-2
shadow
"

>

<X size={18}/>

</button>


</div>

)

}







{
pdf && (

<div

className="
rounded-xl
border
bg-gray-50
p-3
"

>

📄 {pdf.name}


<button

type="button"

onClick={()=>{
setPdf(null)
}}

className="
float-right
text-red-500
"

>

<X size={18}/>

</button>


</div>

)

}







<div

className="
flex
items-center
justify-between
"

>



<label

className="
cursor-pointer
rounded-xl
border
p-3
hover:bg-gray-100
"

>

<Image size={20}/>


<input

hidden

type="file"

accept="image/*"

onChange={handleImageChange}

/>


</label>







<label

className="
cursor-pointer
rounded-xl
border
p-3
hover:bg-gray-100
"

>

<FileText size={20}/>


<input

hidden

type="file"

accept=".pdf"

onChange={handlePdfChange}

/>


</label>







<button

disabled={loading}

className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-bold
text-white
hover:bg-blue-700
disabled:opacity-50
"

>


<Send size={18}/>


{
loading
?
"جاري النشر..."
:
"نشر"
}


</button>



</div>





{
message && (

<p className="
text-center
font-semibold
text-green-600
">

{message}

</p>

)

}





</form>

);

}