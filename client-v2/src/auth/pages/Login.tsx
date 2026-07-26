import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import { supabase } from "../../lib/supabaseClient";


export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");
    setLoading(true);


    const {
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {

      setError(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      );

      setLoading(false);

      return;
    }


    navigate("/dashboard");

  }



  return (

    <AuthLayout
      title="تسجيل الدخول"
      subtitle="ادخل إلى حسابك في UniShare"
    >


      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >


        {/* Email */}

        <div>

          <label
            className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
          >
            البريد الإلكتروني
          </label>


          <div className="relative">

            <Mail
              size={20}
              className="
                absolute
                left-3
                top-3.5
                text-gray-400
              "
            />


            <input
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }

              placeholder="example@email.com"

              required

              className="
                w-full
                rounded-xl
                border
                border-gray-300
                py-3
                pl-10
                pr-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

        </div>



        {/* Password */}

        <div>

          <label
            className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
          >
            كلمة المرور
          </label>


          <div className="relative">

            <Lock
              size={20}
              className="
                absolute
                left-3
                top-3.5
                text-gray-400
              "
            />


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }


              value={password}


              onChange={(e) =>
                setPassword(e.target.value)
              }


              placeholder="********"


              required


              className="
                w-full
                rounded-xl
                border
                border-gray-300
                py-3
                pl-10
                pr-12
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />



            <button

              type="button"

              onClick={() =>
                setShowPassword(!showPassword)
              }

              className="
                absolute
                right-3
                top-3.5
                text-gray-400
              "

            >

              {
                showPassword
                ?
                <EyeOff size={20}/>
                :
                <Eye size={20}/>
              }


            </button>


          </div>

        </div>




        {
          error && (

            <div
              className="
                rounded-lg
                bg-red-50
                text-red-600
                p-3
                text-sm
              "
            >
              {error}
            </div>

          )
        }





        <button

          type="submit"

          disabled={loading}

          className="
            w-full
            flex
            justify-center
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            font-semibold
            transition
            disabled:opacity-50
          "

        >

          {
            loading

            ?

            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              جاري الدخول...
            </>

            :

            "دخول"

          }


        </button>


      </form>




      <p
        className="
          text-center
          text-sm
          text-gray-500
          mt-6
        "
      >

        ليس لديك حساب؟

        <Link

          to="/register"

          className="
            text-blue-600
            font-semibold
            ml-2
          "

        >
          إنشاء حساب
        </Link>


      </p>


    </AuthLayout>

  );

}