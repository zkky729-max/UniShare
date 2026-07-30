import {
  Image,
  FileText,
} from "lucide-react";


interface ComposerToolbarProps {

  onImageChange:
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;


  onPdfChange:
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;

}



export default function ComposerToolbar({

  onImageChange,

  onPdfChange,

}: ComposerToolbarProps) {


  return (

    <div
      className="
        flex
        gap-3
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

          multiple

          onChange={onImageChange}

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

          accept="application/pdf"

          onChange={onPdfChange}

        />


      </label>



    </div>

  );

}