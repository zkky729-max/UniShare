import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useFeed } from "../../context/FeedContext";

import type { AudienceType } from "../../types/post";



export default function useComposer() {


  const {
    createPost,
  } = useFeed();





  const [content, setContent] =
    useState("");



  const [images, setImages] =
    useState<File[]>([]);



  const [pdf, setPdf] =
    useState<File | null>(null);



  const [loading, setLoading] =
    useState(false);



  const [message, setMessage] =
    useState("");




  // =========================
  // Academic Audience
  // =========================

  const [audienceType, setAudienceType] =
    useState<AudienceType>("public");









  // =========================
  // Image Preview
  // =========================

  const imagePreviews =
    useMemo(

      () =>
        images.map(
          (image) =>
            URL.createObjectURL(image)
        ),

      [images]

    );






  useEffect(() => {


    return () => {


      imagePreviews.forEach(
        (url) =>
          URL.revokeObjectURL(url)
      );


    };


  }, [imagePreviews]);









  // =========================
  // Select Images
  // =========================

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {


    const files =
      Array.from(
        e.target.files ?? []
      );



    const validImages =
      files.filter(
        (file) =>
          file.type.startsWith("image/")
      );



    if (!validImages.length)
      return;



    setImages(prev => [

      ...prev,

      ...validImages,

    ]);



    e.target.value = "";


  }









  // =========================
  // Drag & Drop
  // =========================

  function handleDroppedFile(
    file: File
  ) {


    if (
      file.type.startsWith("image/")
    ) {


      setImages(prev => [

        ...prev,

        file,

      ]);


      return;

    }







    if (
      file.type === "application/pdf"
    ) {


      setPdf(file);


    }


  }









  // =========================
  // PDF
  // =========================

  function handlePdfChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {


    const file =
      e.target.files?.[0];



    if (!file)
      return;





    if (
      file.type !== "application/pdf"
    ) {


      alert(
        "اختر ملف PDF فقط"
      );


      return;


    }





    setPdf(file);



    e.target.value = "";


  }









  // =========================
  // Remove Image
  // =========================

  function removeImage(
    index: number
  ) {


    setImages(prev =>

      prev.filter(
        (_, i) =>
          i !== index
      )

    );


  }









  function removePdf() {


    setPdf(null);


  }









  // =========================
  // Submit
  // =========================

  async function handleSubmit(
    e: React.FormEvent
  ) {


    e.preventDefault();






    if (

      !content.trim() &&

      images.length === 0 &&

      !pdf

    ) {

      return;

    }








    try {


      setLoading(true);

      setMessage("");







      await createPost({

        content,

        images,

        pdf,

        audienceType,

      });









      setContent("");

      setImages([]);

      setPdf(null);

      setAudienceType("public");







      setMessage(
        "✅ تم نشر المنشور بنجاح"
      );





    } catch(error: any) {


      console.error(
        "Create post error:",
        error
      );



      alert(
        error.message ??
        "فشل النشر"
      );



    } finally {


      setLoading(false);


    }


  }









  return {


    content,

    setContent,



    images,

    imagePreviews,



    pdf,



    loading,

    message,



    // Academic Audience

    audienceType,

    setAudienceType,



    handleSubmit,



    handleImageChange,

    handleDroppedFile,

    handlePdfChange,



    removeImage,

    removePdf,


  };


}