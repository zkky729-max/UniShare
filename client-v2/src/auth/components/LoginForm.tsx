import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    // سنربط Supabase هنا لاحقاً

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >
      {/* Email */}

      <div>

        <label className="block mb-2 font-semibold">

          البريد الإلكتروني

        </label>

        <div className="relative">

          <Mail
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="
            w-full
            rounded-xl
            border
            py-3
            pr-12
            pl-4
            outline-none
            focus:border-blue-600
            transition
            "
          />

        </div>

      </div>

      {/* Password */}

      <div>

        <label className="block mb-2 font-semibold">

          كلمة المرور

        </label>

        <div className="relative">

          <Lock
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="
            w-full
            rounded-xl
            border
            py-3
            pr-12
            pl-12
            outline-none
            focus:border-blue-600
            transition
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            "
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

      </div>

      {/* Remember */}

      <div className="flex justify-between items-center text-sm">

        <label className="flex items-center gap-2">

          <input type="checkbox" />

          تذكرني

        </label>

        <button
          type="button"
          className="text-blue-600 hover:underline"
        >

          نسيت كلمة المرور؟

        </button>

      </div>

      {/* Button */}

      <button
        disabled={loading}
        className="
        w-full
        bg-blue-600
        text-white
        rounded-xl
        py-3
        font-bold
        hover:bg-blue-700
        transition
        disabled:opacity-70
        flex
        justify-center
        items-center
        gap-3
        "
      >
        {loading && (
          <Loader2
            size={20}
            className="animate-spin"
          />
        )}

        {loading
          ? "جار تسجيل الدخول..."
          : "تسجيل الدخول"}

      </button>

      {/* Register */}

      <div className="text-center text-gray-500">

        ليس لديك حساب؟

        <button
          type="button"
          className="text-blue-600 mr-2 hover:underline"
        >

          إنشاء حساب

        </button>

      </div>

    </form>
  );
}