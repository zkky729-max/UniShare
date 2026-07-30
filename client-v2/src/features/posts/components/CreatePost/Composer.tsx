import {
  useRef,
  useState,
} from "react";


import useComposer from "./useComposer";

import ComposerTextarea from "./ComposerTextarea";
import ComposerAttachments from "./ComposerAttachments";
import ComposerToolbar from "./ComposerToolbar";
import ComposerFooter from "./ComposerFooter";

import AudienceSelector from "../../composer/AudienceSelector";




export default function Composer() {


  const composer =
    useComposer();




  const [isDragging, setIsDragging] =
    useState(false);




  const dragLeaveTimer =
    useRef<number | null>(null);








  function handleDragEnter(
    e: React.DragEvent
  ) {

    e.preventDefault();


    if (dragLeaveTimer.current) {

      clearTimeout(
        dragLeaveTimer.current
      );

    }


    setIsDragging(true);

  }








  function handleDragLeave(
    e: React.DragEvent
  ) {

    e.preventDefault();


    dragLeaveTimer.current =
      window.setTimeout(() => {

        setIsDragging(false);

      }, 100);

  }








  function handleDragOver(
    e: React.DragEvent
  ) {

    e.preventDefault();

  }








  function handleDrop(
    e: React.DragEvent
  ) {

    e.preventDefault();


    if (dragLeaveTimer.current) {

      clearTimeout(
        dragLeaveTimer.current
      );

    }


    setIsDragging(false);





    const files =
      Array.from(
        e.dataTransfer.files
      );



    files.forEach(
      (file) => {

        composer.handleDroppedFile(file);

      }
    );


  }









  return (

    <form


      onSubmit={
        composer.handleSubmit
      }


      onDragEnter={
        handleDragEnter
      }


      onDragOver={
        handleDragOver
      }


      onDragLeave={
        handleDragLeave
      }


      onDrop={
        handleDrop
      }



      className={`

        relative

        rounded-2xl

        border

        p-5

        shadow-sm

        space-y-4

        transition-all

        duration-200


        ${
          isDragging

          ? "border-blue-500 bg-blue-50"

          : "bg-white"

        }

      `}

    >







      {isDragging && (

        <div

          className="

            absolute

            inset-3

            z-10

            flex

            items-center

            justify-center

            rounded-xl

            border-2

            border-dashed

            border-blue-500

            bg-blue-50/90

            font-semibold

            text-blue-600

          "

        >

          📂 اسحب الصور أو ملف PDF هنا

        </div>

      )}









      <AudienceSelector


        value={
          composer.audienceType
        }


        onChange={
          composer.setAudienceType
        }


      />









      <ComposerTextarea

        value={
          composer.content
        }

        onChange={
          composer.setContent
        }

      />









      <ComposerAttachments

        imagePreviews={
          composer.imagePreviews
        }


        pdf={
          composer.pdf
        }


        onRemoveImage={
          composer.removeImage
        }


        onRemovePdf={
          composer.removePdf
        }


      />









      <div

        className="

          flex

          items-center

          justify-between

        "

      >



        <ComposerToolbar


          onImageChange={
            composer.handleImageChange
          }


          onPdfChange={
            composer.handlePdfChange
          }


        />





        <ComposerFooter


          loading={
            composer.loading
          }


          message={
            composer.message
          }


        />


      </div>





    </form>

  );

}