import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="إنشاء حساب"
      subtitle="أنشئ حسابك وابدأ رحلتك التعليمية مع UniShare"
    >
      <RegisterForm />

      <div className="mt-8 text-center text-gray-500">
        لديك حساب بالفعل؟

        <Link
          to="/login"
          className="mr-2 font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          تسجيل الدخول
        </Link>
      </div>
    </AuthLayout>
  );
}