import { useNavigate } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate();


  return (

    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 text-gray-800"
    >


      {/* ================= NAVBAR ================= */}

      <nav className="
      bg-white
      shadow-sm
      fixed
      top-0
      left-0
      right-0
      z-50
      ">

        <div className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
        ">


          <h1 className="
          text-2xl
          font-bold
          text-blue-600
          ">

            UniShare 🎓

          </h1>



          <div className="flex gap-3">


            <button

              onClick={() => navigate("/login")}

              className="
              px-5
              py-2
              text-blue-600
              font-semibold
              "
            >

              تسجيل الدخول

            </button>



            <button

              onClick={() => navigate("/register")}

              className="
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-xl
              hover:bg-blue-700
              transition
              "
            >

              ابدأ الآن

            </button>


          </div>


        </div>

      </nav>






      {/* ================= HERO ================= */}


      <section
        className="
        pt-32
        pb-20
        bg-gradient-to-br
        from-blue-600
        via-blue-500
        to-indigo-700
        text-white
        "
      >


        <div className="
        max-w-6xl
        mx-auto
        px-6
        grid
        md:grid-cols-2
        gap-10
        items-center
        ">



          <div>


            <h1 className="
            text-5xl
            md:text-6xl
            font-bold
            leading-tight
            ">

              منصتك الجامعية الذكية
              <br />

              شارك المعرفة وابنِ مستقبلك

            </h1>



            <p className="
            mt-6
            text-lg
            text-blue-100
            ">

              UniShare منصة جامعية تجمع الطلبة
              والأساتذة والمحتوى الأكاديمي في مكان واحد،
              للوصول إلى الدروس والملفات والامتحانات
              والموارد التعليمية بسهولة.

            </p>





            <div className="mt-8 flex gap-4">


              <button

                onClick={() => navigate("/register")}

                className="
                bg-white
                text-blue-600
                px-7
                py-3
                rounded-xl
                font-bold
                hover:scale-105
                transition
                "
              >

                إنشاء حساب

              </button>




              <button

                onClick={() => navigate("/login")}

                className="
                border
                border-white
                px-7
                py-3
                rounded-xl
                font-bold
                hover:bg-white
                hover:text-blue-600
                transition
                "
              >

                دخول

              </button>



            </div>


          </div>





          <div className="
          hidden
          md:flex
          justify-center
          ">


            <div className="
            bg-white/20
            backdrop-blur
            rounded-3xl
            p-10
            text-center
            ">


              <div className="text-7xl">

                🎓

              </div>


              <h3 className="
              mt-4
              text-2xl
              font-bold
              ">

                مجتمع جامعي متكامل

              </h3>


              <p className="text-blue-100 mt-2">

                تعلم، شارك، وتطور

              </p>


            </div>


          </div>



        </div>


      </section>








      {/* ================= STATS ================= */}


      <section className="
      max-w-6xl
      mx-auto
      px-6
      py-12
      ">


        <div className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-5
        ">


          {[
            ["🎓","الجامعات"],
            ["📚","المقررات"],
            ["📄","الموارد"],
            ["👨‍🎓","الطلبة"]

          ].map(([icon,title]) => (


            <div

              key={title}

              className="
              bg-white
              rounded-2xl
              shadow
              p-6
              text-center
              "

            >

              <div className="text-3xl">

                {icon}

              </div>


              <h3 className="
              mt-3
              font-bold
              ">

                {title}

              </h3>


            </div>


          ))}


        </div>


      </section>








      {/* ================= FEATURES ================= */}


      <section className="
      bg-white
      py-20
      ">


        <div className="
        max-w-6xl
        mx-auto
        px-6
        ">


          <h2 className="
          text-4xl
          font-bold
          text-center
          ">

            كل ما يحتاجه الطالب

          </h2>




          <div className="
          mt-12
          grid
          md:grid-cols-3
          gap-8
          ">


            {[

              {
                icon:"🏫",
                title:"الجامعات",
                text:"استكشف الجامعات والكليات والتخصصات."
              },


              {
                icon:"📚",
                title:"المصادر التعليمية",
                text:"الوصول إلى المحاضرات والملفات العلمية."
              },


              {
                icon:"📝",
                title:"الامتحانات السابقة",
                text:"تدرب على نماذج الامتحانات الجامعية."
              }

            ].map(item=>(


              <div

                key={item.title}

                className="
                rounded-2xl
                border
                p-8
                hover:shadow-xl
                transition
                "

              >


                <div className="text-4xl">

                  {item.icon}

                </div>


                <h3 className="
                text-xl
                font-bold
                mt-4
                ">

                  {item.title}

                </h3>


                <p className="
                mt-3
                text-gray-600
                ">

                  {item.text}

                </p>


              </div>


            ))}


          </div>


        </div>


      </section>








      {/* ================= CTA ================= */}


      <section className="
      py-20
      bg-gray-900
      text-white
      text-center
      ">


        <h2 className="
        text-4xl
        font-bold
        ">

          جاهز للانضمام إلى UniShare؟

        </h2>



        <button

          onClick={() => navigate("/register")}

          className="
          mt-8
          bg-blue-600
          px-8
          py-3
          rounded-xl
          font-bold
          hover:bg-blue-700
          "

        >

          إنشاء حساب مجاني

        </button>


      </section>







      {/* ================= FOOTER ================= */}


      <footer className="
      bg-black
      text-gray-400
      text-center
      py-6
      ">


        © 2026 UniShare
        <br />

        جميع الحقوق محفوظة


      </footer>



    </div>

  );

}