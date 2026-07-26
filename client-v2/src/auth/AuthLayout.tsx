import { GraduationCap, BookOpen, Users, Building2 } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">

      {/* الجانب الأيسر */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-3">

              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur">

                <GraduationCap size={34} />

              </div>

              <h1 className="text-4xl font-extrabold">
                UniShare
              </h1>

            </div>

            <h2 className="mt-14 text-5xl font-bold leading-tight">
              منصة جامعية
              <br />
              عربية حديثة
            </h2>

            <p className="mt-8 text-blue-100 text-xl leading-9 max-w-lg">
              اكتشف الجامعات والكليات والتخصصات والملفات التعليمية
              في مكان واحد، بتجربة استخدام احترافية وسريعة.
            </p>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-white/15 backdrop-blur p-5">

              <Building2 size={32} />

              <h3 className="mt-4 text-3xl font-bold">
                +120
              </h3>

              <p className="text-blue-100">
                جامعة
              </p>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-5">

              <GraduationCap size={32} />

              <h3 className="mt-4 text-3xl font-bold">
                +450
              </h3>

              <p className="text-blue-100">
                كلية
              </p>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-5">

              <BookOpen size={32} />

              <h3 className="mt-4 text-3xl font-bold">
                +12000
              </h3>

              <p className="text-blue-100">
                ملف تعليمي
              </p>

            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-5">

              <Users size={32} />

              <h3 className="mt-4 text-3xl font-bold">
                +25000
              </h3>

              <p className="text-blue-100">
                طالب
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* الجانب الأيمن */}

      <div className="flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          <div className="text-center mb-10">

            <h2 className="text-4xl font-bold text-gray-800">
              {title}
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              {subtitle}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}