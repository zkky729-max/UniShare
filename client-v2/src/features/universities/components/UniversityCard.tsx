import {
  ArrowLeft,
  Building2,
  MapPin,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  University,
} from "../types/university";


interface UniversityCardProps {
  university: University;
}


export default function UniversityCard({
  university,
}: UniversityCardProps) {

  const navigate = useNavigate();


  const handleOpen = () => {
    navigate(
      `/universities/${university.slug}`
    );
  };


  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-gray-800
        dark:bg-gray-900
      "
    >

      {/* =========================
          HEADER / LOGO
      ========================= */}

      <div
        className="
          relative
          flex
          h-40
          items-center
          justify-center
          overflow-hidden
          bg-gradient-to-br
          from-blue-50
          via-indigo-50
          to-purple-50
          dark:from-blue-950/40
          dark:via-indigo-950/40
          dark:to-purple-950/40
        "
      >

        {university.logo_url ? (
          <img
            src={university.logo_url}
            alt={university.name}
            className="
              h-24
              w-24
              rounded-2xl
              bg-white
              object-contain
              p-2
              shadow-md
            "
          />
        ) : (
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-blue-600
              shadow-md
              dark:bg-gray-800
            "
          >
            <Building2 size={38} />
          </div>
        )}

      </div>



      {/* =========================
          CONTENT
      ========================= */}

      <div className="p-6">

        {university.short_name && (
          <p
            className="
              text-sm
              font-semibold
              text-blue-600
              dark:text-blue-400
            "
          >
            {university.short_name}
          </p>
        )}


        <h2
          className="
            mt-2
            line-clamp-2
            min-h-[56px]
            text-xl
            font-bold
            leading-7
            text-gray-900
            dark:text-white
          "
        >
          {university.name}
        </h2>


        {university.city && (
          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            <MapPin size={17} />

            <span>
              {university.city}
            </span>
          </div>
        )}



        {/* =========================
            SINGLE OPEN BUTTON
        ========================= */}

        <button
          type="button"
          onClick={handleOpen}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            active:scale-[0.98]
          "
        >

          <span>
            دخول الجامعة
          </span>

          <ArrowLeft
            size={18}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

        </button>

      </div>

    </article>
  );
}