import {
  GraduationCap,
  Building2,
  FileText,
  Users,
  BookOpen,
  Clock,
} from "lucide-react";

import { useAuth } from "../../auth/context/AuthContext";
import PostsPage from "../../posts/pages/PostsPage";


export default function Dashboard() {

  const {
    user,
    profile,
  } = useAuth();



  const stats = [
    {
      title: "الجامعات",
      value: "120",
      icon: <Building2 size={30} />,
    },
    {
      title: "الكليات",
      value: "450",
      icon: <GraduationCap size={30} />,
    },
    {
      title: "الملفات التعليمية",
      value: "12,500",
      icon: <FileText size={30} />,
    },
    {
      title: "الطلاب",
      value: "25,000",
      icon: <Users size={30} />,
    },
  ];



  const universities = [
    {
      name: "جامعة لونيسي علي البليدة 2",
      country: "الجزائر",
    },
    {
      name: "جامعة الجزائر 1",
      country: "الجزائر",
    },
    {
      name: "جامعة القاهرة",
      country: "مصر",
    },
  ];



  const files = [
    {
      title: "محاضرات الاقتصاد الجزئي",
      type: "PDF",
      date: "اليوم",
    },
    {
      title: "امتحانات السنة الثانية قانون",
      type: "PDF",
      date: "منذ يومين",
    },
    {
      title: "ملخصات علوم التسيير",
      type: "DOC",
      date: "هذا الأسبوع",
    },
  ];



  return (

    <div className="space-y-8">


      {/* Welcome */}

      <section
        className="
        rounded-3xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        p-8
        text-white
        shadow-lg
        "
      >

        <h1 className="text-3xl font-bold">

          مرحبا بك {profile?.full_name || "في UniShare"} 🎓

        </h1>


        <p className="mt-3 text-lg text-blue-100">

          منصتك الجامعية للوصول إلى الجامعات،
          الكليات، التخصصات والموارد التعليمية.

        </p>


        <div className="mt-5 space-y-1 text-sm text-blue-100">

          <p>
            📧 {user?.email}
          </p>

          <p>
            🔐 الصلاحية: {profile?.role}
          </p>

        </div>


      </section>







      {/* Statistics */}

      <section
        className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        lg:grid-cols-4
        "
      >

        {stats.map((item) => (

          <div
            key={item.title}
            className="
            rounded-2xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:shadow-lg
            "
          >

            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-white
              "
            >

              {item.icon}

            </div>


            <h3 className="mt-5 text-gray-500">

              {item.title}

            </h3>


            <p className="mt-2 text-3xl font-bold">

              {item.value}

            </p>


          </div>

        ))}


      </section>








      {/* UniShare Feed Widget */}

      <section
        className="
        rounded-3xl
        border
        bg-white
        p-4
        shadow-sm
        "
      >

        <PostsPage embedded />

      </section>









      {/* Universities */}

      <section
        className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        "
      >

        <h2 className="mb-5 text-2xl font-bold">

          آخر الجامعات 🏛️

        </h2>



        <div
          className="
          grid
          gap-5
          md:grid-cols-3
          "
        >

          {universities.map((uni) => (

            <div
              key={uni.name}
              className="
              rounded-2xl
              border
              p-5
              transition
              hover:shadow-md
              "
            >

              <Building2
                size={35}
                className="text-blue-600"
              />


              <h3 className="mt-3 font-bold">

                {uni.name}

              </h3>


              <p className="mt-2 text-gray-500">

                📍 {uni.country}

              </p>


            </div>

          ))}


        </div>


      </section>









      {/* Files */}

      <section
        className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        "
      >

        <h2 className="mb-5 text-2xl font-bold">

          آخر الملفات التعليمية 📚

        </h2>



        <div className="space-y-4">


          {files.map((file) => (

            <div
              key={file.title}
              className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              p-4
              transition
              hover:bg-gray-50
              "
            >

              <div className="flex items-center gap-4">


                <div
                  className="
                  rounded-xl
                  bg-blue-100
                  p-3
                  text-blue-600
                  "
                >

                  <BookOpen />

                </div>



                <div>

                  <h3 className="font-semibold">

                    {file.title}

                  </h3>


                  <p className="text-sm text-gray-500">

                    {file.type}

                  </p>


                </div>


              </div>




              <div
                className="
                flex
                items-center
                gap-2
                text-gray-500
                "
              >

                <Clock size={18} />

                {file.date}


              </div>


            </div>

          ))}


        </div>


      </section>



    </div>

  );
}