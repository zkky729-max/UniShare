import {
  Building2,
  MapPin,
} from "lucide-react";

import {
  useParams,
} from "react-router-dom";

import {
  useUniversity,
} from "../hooks/useUniversity";



export default function UniversitySpacePage() {

  const {
    slug,
  } = useParams<{
    slug: string;
  }>();



  const {
    university,
    loading,
    error,
  } = useUniversity(slug);



  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-8
          dark:bg-gray-950
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[400px]
            max-w-7xl
            items-center
            justify-center
          "
        >
          <div className="text-center">

            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-blue-200
                border-t-blue-600
              "
            />

            <p
              className="
                mt-4
                text-gray-500
                dark:text-gray-400
              "
            >
              جاري تحميل الجامعة...
            </p>

          </div>
        </div>
      </main>
    );
  }



  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <main
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-8
          dark:bg-gray-950
        "
      >
        <div
          className="
            mx-auto
            max-w-4xl
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-red-200
              bg-red-50
              p-8
              text-red-700
              dark:border-red-900
              dark:bg-red-950/30
              dark:text-red-300
            "
          >

            <h1
              className="
                text-xl
                font-bold
              "
            >
              تعذر تحميل الجامعة
            </h1>

            <p
              className="
                mt-3
                text-sm
              "
            >
              {error}
            </p>

          </div>

        </div>
      </main>
    );
  }



  /* =========================
     NOT FOUND
  ========================= */

  if (!university) {
    return (
      <main
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-8
          dark:bg-gray-950
        "
      >

        <div
          className="
            mx-auto
            flex
            min-h-[400px]
            max-w-4xl
            items-center
            justify-center
          "
        >

          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gray-100
                text-gray-400
                dark:bg-gray-900
              "
            >
              <Building2 size={30} />
            </div>

            <h1
              className="
                mt-5
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              الجامعة غير موجودة
            </h1>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-gray-400
              "
            >
              لم نتمكن من العثور على الجامعة المطلوبة.
            </p>

          </div>

        </div>

      </main>
    );
  }



  /* =========================
     UNIVERSITY SPACE
  ========================= */

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        dark:bg-gray-950
      "
    >

      {/* =========================
          HERO
      ========================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-blue-600
          via-indigo-600
          to-purple-700
          px-4
          py-10
          text-white
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-16
            h-72
            w-72
            rounded-full
            bg-white/10
          "
        />


        <div
          className="
            relative
            mx-auto
            max-w-7xl
          "
        >

          <div
            className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-center
            "
          >

            {/* Logo */}

            <div
              className="
                flex
                h-28
                w-28
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                bg-white
                p-3
                shadow-xl
              "
            >

              {university.logo_url ? (
                <img
                  src={university.logo_url}
                  alt={university.name}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              ) : (
                <Building2
                  size={48}
                  className="text-blue-600"
                />
              )}

            </div>



            {/* University information */}

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-blue-100
                "
              >
                UniShare University Space
              </p>


              <h1
                className="
                  mt-2
                  text-3xl
                  font-bold
                  sm:text-4xl
                "
              >
                {university.name}
              </h1>


              {university.short_name && (
                <p
                  className="
                    mt-2
                    text-blue-100
                  "
                >
                  {university.short_name}
                </p>
              )}


              {university.city && (
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-blue-100
                  "
                >
                  <MapPin size={17} />

                  <span>
                    {university.city}
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </section>



      {/* =========================
          CONTENT
      ========================= */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              الكليات
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              0
            </p>

          </div>


          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              التخصصات
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              0
            </p>

          </div>


          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              dark:border-gray-800
              dark:bg-gray-900
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              المنشورات
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              0
            </p>

          </div>

        </div>



        {/* Academic structure placeholder */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            dark:border-gray-800
            dark:bg-gray-900
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            الفضاء الأكاديمي
          </h2>


          <p
            className="
              mt-3
              leading-7
              text-gray-500
              dark:text-gray-400
            "
          >
            سيتم هنا تنظيم الكليات والتخصصات والمستويات
            والوحدات والمواد الخاصة بهذه الجامعة.
          </p>

        </div>

      </section>

    </main>
  );
}