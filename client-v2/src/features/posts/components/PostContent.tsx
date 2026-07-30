import { useState } from "react";

interface PostContentProps {
  content: string;

  image?: string;

  images_urls?: string[];
}


export default function PostContent({
  content,
  image,
  images_urls = [],
}: PostContentProps) {


  const [expanded, setExpanded] =
    useState(false);



  const shouldShowButton =
    content.length > 250;



  // دمج القديم والجديد
  const images =
    images_urls.length > 0
      ? images_urls
      : image
        ? [image]
        : [];




  return (

    <div className="mt-4 space-y-4">


      {/* النص */}

      {content && (

        <div>

          <p
            className={`
              text-gray-800
              whitespace-pre-wrap
              leading-7
              transition-all
              duration-300

              ${
                !expanded &&
                shouldShowButton
                  ? "line-clamp-5"
                  : ""
              }
            `}
          >

            {content}

          </p>



          {shouldShowButton && (

            <button

              type="button"

              onClick={() =>
                setExpanded(!expanded)
              }

              className="
                mt-2
                text-sm
                font-medium
                text-blue-600
                hover:text-blue-700
                hover:underline
              "

            >

              {
                expanded
                  ? "Afficher moins"
                  : "Afficher la suite"
              }


            </button>

          )}

        </div>

      )}







      {/* الصور */}

      {images.length > 0 && (

        <div

          className={`
            grid
            gap-2

            ${
              images.length === 1
                ? "grid-cols-1"
                : "grid-cols-2"
            }
          `}

        >

          {images.map(
            (src, index) => (

              <img

                key={index}

                src={src}

                alt={`post-image-${index}`}

                className="
                  w-full
                  rounded-xl
                  object-cover
                  max-h-96
                "

              />

            )
          )}

        </div>

      )}



    </div>

  );

}