interface PostMediaProps {
  image?: string;
  pdf?: string;
}


export default function PostMedia({
  image,
  pdf,
}: PostMediaProps) {


  if (!image && !pdf) {
    return null;
  }



  return (

    <div className="mt-5 space-y-4">



      {image && (

        <div
          className="
            overflow-hidden
            rounded-xl
            border
          "
        >

          <img

            src={image}

            alt="Post attachment"

            loading="lazy"

            className="
              w-full
              max-h-[600px]
              object-cover
              transition-transform
              duration-300
              hover:scale-[1.02]
            "

          />

        </div>

      )}






      {pdf && (

        <a

          href={pdf}

          target="_blank"

          rel="noopener noreferrer"

          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            bg-gray-50
            p-4
            text-blue-600
            hover:bg-gray-100
          "

        >

          📄

          <span>
            عرض ملف PDF
          </span>


        </a>

      )}




    </div>

  );

}