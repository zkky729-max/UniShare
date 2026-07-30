interface ComposerAttachmentsProps {
  imagePreviews: string[];
  pdf: File | null;

  onRemoveImage: (index: number) => void;
  onRemovePdf: () => void;
}


export default function ComposerAttachments({

  imagePreviews,

  pdf,

  onRemoveImage,

  onRemovePdf,

}: ComposerAttachmentsProps) {


  return (

    <div className="space-y-4">


      {/* Images Preview */}

      {imagePreviews.length > 0 && (

        <div
          className="
            grid
            grid-cols-2
            gap-3
          "
        >

          {imagePreviews.map(
            (src,index)=>(

              <div
                key={src}
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                "
              >


                <img

                  src={src}

                  alt="preview"

                  className="
                    h-40
                    w-full
                    object-cover
                  "

                />



                <button

                  type="button"

                  onClick={() =>
                    onRemoveImage(index)
                  }

                  className="
                    absolute
                    right-2
                    top-2
                    rounded-full
                    bg-white
                    px-2
                    py-1
                    text-red-600
                    shadow
                  "

                >

                  ✕

                </button>


              </div>

            )
          )}

        </div>

      )}






      {/* PDF Preview */}

      {pdf && (

        <div

          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            bg-gray-50
            p-3
          "

        >

          <span className="truncate">

            📄 {pdf.name}

          </span>



          <button

            type="button"

            onClick={onRemovePdf}

            className="
              text-red-600
            "

          >

            ✕

          </button>


        </div>

      )}



    </div>

  );

}