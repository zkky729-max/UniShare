import {
  GraduationCap,
  BookOpen,
  Users,
  Building2,
} from "lucide-react";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">

      {/* الجانب التعريفي */}
      <div className="
        hidden lg:flex
        flex-col
        justify-center
        px-16
        bg-gradient-to-br
        from-blue-700
        via-indigo-700
        to-purple-700
        text-white
      ">

        <div className="flex items-center gap-3 mb-8">
          <GraduationCap size={48}/>
          <h1 className="text-4xl font-bold">
            UniShare
          </h1>
        </div>


        <h2 className="text-3xl font-semibold mb-4">
          منصة مشاركة المعرفة الجامعية
        </h2>

        <p className="text-blue-100 text-lg mb-10">
          شارك المحاضرات، الملخصات، الملفات والموارد
          مع طلبة الجامعة.
        </p>


        <div className="space-y-5">

          <Feature
            icon={<BookOpen />}
            text="تنظيم الدروس والمواد"
          />

          <Feature
            icon={<Users />}
            text="مجتمع جامعي متعاون"
          />

          <Feature
            icon={<Building2 />}
            text="كلية وتخصصات منظمة"
          />

        </div>

      </div>


      {/* المحتوى */}
      <div className="
        flex
        items-center
        justify-center
        p-6
      ">

        <div className="w-full max-w-md">

          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">
              UniShare
            </h1>
          </div>


          <div className="
            bg-white
            rounded-2xl
            shadow-xl
            p-8
          ">

            <h2 className="
              text-2xl
              font-bold
              text-gray-800
            ">
              {title}
            </h2>

            <p className="
              text-gray-500
              mt-2
              mb-6
            ">
              {subtitle}
            </p>


            {children}

          </div>

        </div>

      </div>

    </div>
  );
}


function Feature({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {

  return (
    <div className="
      flex
      items-center
      gap-4
    ">
      <div className="
        p-3
        rounded-xl
        bg-white/10
      ">
        {icon}
      </div>

      <span>
        {text}
      </span>

    </div>
  );
}