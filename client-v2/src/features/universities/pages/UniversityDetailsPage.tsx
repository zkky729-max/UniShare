import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  ChevronLeft,
  GraduationCap,
  Info,
  Landmark,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabaseClient";

interface University {
  id: string;
  name: string;
  slug: string;
  country_id: string | null;
}

interface Faculty {
  id: string;
  name: string;
  description?: string | null;
  university_id?: string;
}

export default function UniversityDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [university, setUniversity] =
    useState<University | null>(null);

  const [faculties, setFaculties] =
    useState<Faculty[]>([]);

  const [specialtyCount, setSpecialtyCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadUniversity() {
      if (!slug) {
        setError("معرف الجامعة غير موجود");
        setLoading(false);
        return;
      }

      try {
        /*
         * ==========================================
         * UNIVERSITY
         * ==========================================
         */

        const {
          data: universityData,
          error: universityError,
        } = await supabase
          .from("universities")
          .select(
            "id,name,slug,country_id"
          )
          .eq("slug", slug)
          .single();

        if (universityError) {
          throw universityError;
        }

        setUniversity(universityData);

        /*
         * ==========================================
         * FACULTIES
         * ==========================================
         */

        const {
          data: facultiesData,
          error: facultiesError,
        } = await supabase
          .from("faculties")
          .select(
            "id,name,description,university_id"
          )
          .eq(
            "university_id",
            universityData.id
          )
          .order("name");

        if (facultiesError) {
          throw facultiesError;
        }

        const loadedFaculties =
          facultiesData || [];

        setFaculties(
          loadedFaculties
        );

        /*
         * ==========================================
         * SPECIALTIES COUNT
         * ==========================================
         */

        if (
          loadedFaculties.length > 0
        ) {
          const facultyIds =
            loadedFaculties.map(
              (faculty) => faculty.id
            );

          const {
            data: specialtiesData,
            error: specialtiesError,
          } = await supabase
            .from("specialties")
            .select(
              "id,faculty_id"
            )
            .in(
              "faculty_id",
              facultyIds
            );

          if (!specialtiesError) {
            setSpecialtyCount(
              specialtiesData?.length || 0
            );
          }
        }
      } catch (err: any) {
        console.error(
          "University page error:",
          err
        );

        setError(
          err?.message ||
            "تعذر تحميل بيانات الجامعة"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUniversity();
  }, [slug]);

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <Building2 size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              جاري تحميل الجامعة...
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              يتم تحميل بيانات الجامعة والكليات والتخصصات.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * ERROR
   * ==========================================
   */

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-3xl border border-red-100 bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Info size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              تعذر تحميل الجامعة
            </h2>

            <p className="mt-3 text-sm text-red-600 break-words">
              {error}
            </p>

            <button
              onClick={() =>
                navigate("/universities")
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-green-700
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-green-800
              "
            >
              <ArrowRight size={18} />

              العودة إلى الجامعات
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-gray-950
          via-gray-900
          to-green-950
        "
      >
        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-green-500/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-20
            h-96
            w-96
            rounded-full
            bg-lime-400/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-5
            py-6
            lg:px-8
          "
        >

          {/* Breadcrumb */}

          <div
            className="
              mb-12
              flex
              items-center
              gap-2
              text-sm
              text-white/70
            "
          >
            <button
              onClick={() =>
                navigate("/")
              }
              className="transition hover:text-white"
            >
              الرئيسية
            </button>

            <ChevronLeft size={15} />

            <button
              onClick={() =>
                navigate("/universities")
              }
              className="transition hover:text-white"
            >
              الجامعات
            </button>

            <ChevronLeft size={15} />

            <span className="truncate font-medium text-white">
              {university.name}
            </span>
          </div>

          {/* Hero Content */}

          <div
            className="
              grid
              gap-10
              pb-14
              lg:grid-cols-[1fr_300px]
              lg:items-center
            "
          >

            {/* University Information */}

            <div className="max-w-4xl">

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-green-400/30
                  bg-green-500/15
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-green-300
                "
              >
                <Sparkles size={16} />

                University Space
              </div>

              <h1
                className="
                  max-w-4xl
                  text-4xl
                  font-black
                  leading-[1.15]
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {university.name}
              </h1>

              {/* University Meta */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-4
                  text-white/80
                "
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin
                    size={18}
                    className="text-green-400"
                  />

                  الجزائر
                </span>

                <span className="hidden text-white/30 sm:block">
                  •
                </span>

                <span className="inline-flex items-center gap-2">
                  <Building2
                    size={18}
                    className="text-green-400"
                  />

                  {faculties.length} كليات
                </span>

                <span className="hidden text-white/30 sm:block">
                  •
                </span>

                <span className="inline-flex items-center gap-2">
                  <BookOpen
                    size={18}
                    className="text-green-400"
                  />

                  {specialtyCount} تخصص
                </span>
              </div>

              <p
                className="
                  mt-6
                  max-w-3xl
                  text-base
                  leading-8
                  text-white/70
                  md:text-lg
                "
              >
                فضاء أكاديمي متكامل لجامعة{" "}
                {university.name} يتيح للطلبة
                استكشاف الكليات والتخصصات والمجتمع
                الجامعي في مكان واحد.
              </p>

              {/* Actions */}

              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    document
                      .getElementById("faculties")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    px-6
                    py-3.5
                    font-bold
                    text-white
                    shadow-lg
                    shadow-green-900/30
                    transition
                    hover:bg-green-500
                  "
                >
                  <Building2 size={19} />

                  استكشف الكليات

                  <ArrowLeft size={17} />
                </button>

                <button
                  onClick={() =>
                    navigate("/universities")
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    px-6
                    py-3.5
                    font-bold
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <ArrowRight size={18} />

                  العودة إلى الجامعات
                </button>

              </div>
            </div>

            {/* University Identity Card */}

            <div className="flex justify-center lg:justify-end">
              <div
                className="
                  flex
                  h-56
                  w-56
                  flex-col
                  items-center
                  justify-center
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/10
                  p-8
                  text-center
                  shadow-2xl
                  backdrop-blur-xl
                  sm:h-64
                  sm:w-64
                  lg:h-72
                  lg:w-72
                "
              >
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-500/20
                    text-green-300
                    ring-1
                    ring-green-400/20
                  "
                >
                  <Building2 size={40} />
                </div>

                <p className="mt-5 text-sm font-medium text-white/60">
                  Academic Institution
                </p>

                <p className="mt-2 line-clamp-2 text-sm font-bold text-white">
                  {university.name}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main
        className="
          mx-auto
          max-w-7xl
          px-5
          pb-12
          lg:px-8
        "
      >

        {/* ==========================================
            STATS
        ========================================== */}

        <section
          className="
            relative
            z-20
            -mt-8
            grid
            grid-cols-2
            gap-3
            lg:grid-cols-4
            md:gap-4
          "
        >

          <StatCard
            icon={<Users size={23} />}
            value="+25,000"
            label="طالب وطالبة"
            description="مجتمع جامعي نشط"
          />

          <StatCard
            icon={<Building2 size={23} />}
            value={faculties.length}
            label="كليات"
            description="كليات الجامعة"
          />

          <StatCard
            icon={<BookOpen size={23} />}
            value={
              specialtyCount > 0
                ? specialtyCount
                : "—"
            }
            label="تخصص"
            description="تخصصات أكاديمية"
          />

          <StatCard
            icon={<Landmark size={23} />}
            value="202"
            label="سنة التأسيس"
            description="مسيرة أكاديمية"
          />

        </section>

        {/* ==========================================
            SPACE NAVIGATION
        ========================================== */}

        <section
          className="
            mt-8
            grid
            grid-cols-2
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-2
            shadow-sm
            md:grid-cols-4
          "
        >

          <SpaceTab
            active
            icon={<Building2 size={18} />}
            label="الكليات"
            onClick={() =>
              document
                .getElementById("faculties")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          />

          <SpaceTab
            icon={<BookOpen size={18} />}
            label="التخصصات"
            onClick={() =>
              document
                .getElementById("faculties")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          />

          <SpaceTab
            icon={<Users size={18} />}
            label="المنشورات"
            onClick={() =>
              navigate("/posts")
            }
          />

          <SpaceTab
            icon={<Info size={18} />}
            label="عن الجامعة"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          />

        </section>

        {/* ==========================================
            FACULTIES
        ========================================== */}

        <section
          id="faculties"
          className="mt-16 scroll-mt-8"
        >

          <div
            className="
              mb-8
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            <div>

              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  font-bold
                  text-green-700
                "
              >
                <Building2 size={21} />

                Academic Faculties
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-gray-950
                  md:text-4xl
                "
              >
                كليات الجامعة
              </h2>

              <p
                className="
                  mt-3
                  leading-7
                  text-gray-500
                "
              >
                استكشف الكليات والتخصصات والمسارات
                الأكاديمية التابعة لجامعة{" "}
                {university.name}.
              </p>

            </div>

            <div
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                border-green-100
                bg-green-50
                px-4
                py-2
                text-sm
                font-bold
                text-green-700
              "
            >
              <Building2 size={17} />

              {faculties.length} كليات
            </div>

          </div>

          {faculties.length === 0 ? (
            <div
              className="
                rounded-3xl
                border
                border-gray-100
                bg-white
                p-12
                text-center
                text-gray-500
                shadow-sm
              "
            >
              لا توجد كليات مرتبطة بهذه الجامعة حاليًا.
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {faculties.map(
                (faculty, index) => (
                  <FacultyCard
                    key={faculty.id}
                    faculty={faculty}
                    index={index}
                    onClick={() =>
                      navigate(
                        `/faculties/${faculty.id}/specialties`
                      )
                    }
                  />
                )
              )}
            </div>
          )}

        </section>

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <section
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-l
            from-green-800
            to-green-600
            p-8
            text-white
            shadow-xl
            md:p-10
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <GraduationCap size={30} />

                <span className="font-bold">
                  UniShare Academic Space
                </span>
              </div>

              <h3
                className="
                  text-2xl
                  font-black
                  md:text-3xl
                "
              >
                اكتشف مجتمع جامعتك
              </h3>

              <p
                className="
                  mt-2
                  leading-7
                  text-white/75
                "
              >
                تعرّف على الكليات والتخصصات وكن جزءًا
                من المجتمع الجامعي.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/posts")
              }
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3.5
                font-black
                text-green-800
                transition
                hover:bg-green-50
              "
            >
              استكشف المنشورات

              <ArrowLeft size={18} />
            </button>

          </div>
        </section>

      </main>
    </div>
  );
}

/*
 * ==========================================
 * STAT CARD
 * ==========================================
 */

function StatCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm
        md:p-6
      "
    >
      <div
        className="
          mb-4
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-green-50
          text-green-700
        "
      >
        {icon}
      </div>

      <div
        className="
          text-2xl
          font-black
          text-green-700
          md:text-3xl
        "
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-sm
          font-bold
          text-gray-800
          md:text-base
        "
      >
        {label}
      </div>

      <div
        className="
          mt-1.5
          hidden
          text-xs
          text-gray-400
          sm:block
        "
      >
        {description}
      </div>
    </div>
  );
}

/*
 * ==========================================
 * SPACE TAB
 * ==========================================
 */

function SpaceTab({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-4
        py-3.5
        text-sm
        font-bold
        transition
        ${
          active
            ? "bg-green-50 text-green-700"
            : "text-gray-500 hover:bg-gray-50 hover:text-green-700"
        }
      `}
    >
      {icon}

      {label}

      {active && (
        <span
          className="
            absolute
            bottom-0
            left-6
            right-6
            h-0.5
            rounded-full
            bg-green-700
          "
        />
      )}
    </button>
  );
}

/*
 * ==========================================
 * FACULTY CARD
 * ==========================================
 */

function FacultyCard({
  faculty,
  index,
  onClick,
}: {
  faculty: Faculty;
  index: number;
  onClick: () => void;
}) {
  const accentStyles = [
    {
      background: "bg-blue-50",
      icon: "text-blue-600",
      badge: "bg-blue-50 text-blue-700",
    },
    {
      background: "bg-green-50",
      icon: "text-green-600",
      badge: "bg-green-50 text-green-700",
    },
    {
      background: "bg-violet-50",
      icon: "text-violet-600",
      badge: "bg-violet-50 text-violet-700",
    },
    {
      background: "bg-amber-50",
      icon: "text-amber-600",
      badge: "bg-amber-50 text-amber-700",
    },
  ];

  const style =
    accentStyles[
      index % accentStyles.length
    ];

  return (
    <article
      className="
        group
        flex
        min-h-[390px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* Faculty Header */}

      <div
        className={`
          relative
          flex
          h-48
          items-center
          justify-center
          overflow-hidden
          ${style.background}
        `}
      >

        {/* Decorative shapes */}

        <div
          className="
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-white/60
          "
        />

        <div
          className="
            absolute
            -bottom-12
            -left-12
            h-36
            w-36
            rounded-full
            bg-white/50
          "
        />

        <div
          className={`
            relative
            z-10
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            bg-white
            shadow-lg
            ${style.icon}
            transition
            duration-300
            group-hover:scale-105
          `}
        >
          <Building2 size={42} />
        </div>

        {/* Faculty Badge */}

        <div
          className={`
            absolute
            right-4
            top-4
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
            shadow-sm
            ${style.badge}
          `}
        >
          <Building2 size={14} />

          كلية
        </div>

      </div>

      {/* Content */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-5
        "
      >

        <h3
          className="
            line-clamp-3
            min-h-[72px]
            text-base
            font-black
            leading-6
            text-gray-900
          "
        >
          {faculty.name}
        </h3>

        <p
          className="
            mt-3
            line-clamp-3
            min-h-[72px]
            text-sm
            leading-6
            text-gray-500
          "
        >
          {faculty.description ||
            "كلية أكاديمية ضمن جامعة البليدة 2 لونيسي علي، تضم مجموعة من التخصصات والمسارات التعليمية."}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-green-700
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-green-600
            "
          />

          تخصصات أكاديمية متعددة
        </div>

        <button
          onClick={onClick}
          className="
            mt-auto
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-700
            py-3
            font-bold
            text-white
            transition
            hover:bg-green-800
            active:scale-[0.98]
          "
        >
          استكشف الكلية

          <ArrowLeft size={18} />
        </button>

      </div>
    </article>
  );
}