import {
  Building2,
  Search,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import UniversityCard from "../components/UniversityCard";

import {
  useUniversities,
} from "../hooks/useUniversities";



export default function UniversitiesPage() {

  const {
    universities,
    loading,
    error,
  } = useUniversities();



  const [
    search,
    setSearch,
  ] = useState("");



  const filteredUniversities =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();



      if (!query) {
        return universities;
      }



      return universities.filter(
        (university) => {

          return (
            university.name
              .toLowerCase()
              .includes(query) ||

            university.short_name
              ?.toLowerCase()
              .includes(query) ||

            university.city
              ?.toLowerCase()
              .includes(query)
          );
        }
      );

    }, [
      universities,
      search,
    ]);



  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        px-4
        py-6
        dark:bg-gray-950
        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* =========================
            HERO
        ========================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-purple-700
            p-6
            text-white
            shadow-xl
            sm:p-8
            lg:p-10
          "
        >

          {/* Decorative circles */}

          <div
            className="
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -left-10
              h-56
              w-56
              rounded-full
              bg-white/10
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/15
                    backdrop-blur-sm
                  "
                >
                  <Building2
                    size={30}
                  />
                </div>


                <div>

                  <p
                    className="
                      text-sm
                      font-medium
                      text-blue-100
                    "
                  >
                    UniShare Academic Network
                  </p>


                  <h1
                    className="
                      mt-1
                      text-3xl
                      font-bold
                      sm:text-4xl
                    "
                  >
                    الجامعات
                  </h1>

                </div>

              </div>


              <p
                className="
                  mt-5
                  max-w-2xl
                  leading-7
                  text-blue-100
                "
              >
                استكشف الجامعات والمؤسسات الأكاديمية
                واكتشف فضاءات الكليات والتخصصات
                الخاصة بكل جامعة.
              </p>

            </div>



            {/* University count */}

            {!loading && !error && (
              <div
                className="
                  rounded-2xl
                  bg-white/10
                  px-6
                  py-4
                  text-center
                  backdrop-blur-sm
                "
              >

                <p
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {universities.length}
                </p>

                <p
                  className="
                    text-sm
                    text-blue-100
                  "
                >
                  جامعة
                </p>

              </div>
            )}

          </div>

        </section>



        {/* =========================
            SEARCH
        ========================= */}

        {!loading && !error && (
          <section className="mt-6">

            <div className="relative">

              <Search
                size={20}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="ابحث عن جامعة أو مدينة..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  py-4
                  pr-12
                  pl-4
                  text-gray-900
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:text-white
                "
              />

            </div>

          </section>
        )}



        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <section
            className="
              mt-8
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-[380px]
                  animate-pulse
                  rounded-3xl
                  bg-gray-200
                  dark:bg-gray-800
                "
              />
            ))}

          </section>
        )}



        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (
          <section
            className="
              mt-8
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
              text-red-700
              dark:border-red-900
              dark:bg-red-950/30
              dark:text-red-300
            "
          >

            <h2 className="font-bold">
              تعذر تحميل الجامعات
            </h2>

            <p className="mt-2 text-sm">
              {error}
            </p>

          </section>
        )}



        {/* =========================
            RESULTS
        ========================= */}

        {!loading &&
          !error &&
          filteredUniversities.length > 0 && (
            <section className="mt-8">

              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  الجامعات المتاحة
                </h2>


                <span
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {filteredUniversities.length} نتيجة
                </span>

              </div>



              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {filteredUniversities.map(
                  (university) => (
                    <UniversityCard
                      key={university.id}
                      university={university}
                    />
                  )
                )}

              </div>

            </section>
          )}



        {/* =========================
            EMPTY
        ========================= */}

        {!loading &&
          !error &&
          filteredUniversities.length === 0 && (

            <section
              className="
                mt-8
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-12
                text-center
                dark:border-gray-800
                dark:bg-gray-900
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-950
                "
              >
                <Search size={28} />
              </div>


              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                لم نجد أي جامعة
              </h2>


              <p
                className="
                  mt-2
                  text-gray-500
                  dark:text-gray-400
                "
              >
                جرّب البحث باسم جامعة أو مدينة
                مختلفة.
              </p>

            </section>
          )}

      </div>

    </main>
  );
}