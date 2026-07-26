import { useMemo, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthText = ["ضعيفة", "ضعيفة", "متوسطة", "جيدة", "قوية"];
  const strengthColor = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!acceptTerms) {
      alert("يجب الموافقة على الشروط أولاً.");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);

    try {
      // سيتم ربط Supabase هنا لاحقاً

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("تم إنشاء الحساب بنجاح.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* الاسم */}
      <div>
        <label className="mb-2 block font-medium">
          الاسم الكامل
        </label>

        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="أدخل اسمك الكامل"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      {/* البريد */}
      <div>
        <label className="mb-2 block font-medium">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      {/* كلمة المرور */}
      <div>
        <label className="mb-2 block font-medium">
          كلمة المرور
        </label>

        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-12 outline-none transition focus:border-blue-600"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* قوة كلمة المرور */}

        <div className="mt-4">
          <div className="mb-2 flex justify-between text-sm">
            <span>قوة كلمة المرور</span>

            <span>{strengthText[passwordStrength]}</span>
          </div>

          <div className="h-2 rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full transition-all ${
                strengthColor[passwordStrength]
              }`}
              style={{
                width: `${(passwordStrength / 4) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* تأكيد كلمة المرور */}

      <div>
        <label className="mb-2 block font-medium">
          تأكيد كلمة المرور
        </label>

        <div className="relative">
          <input
            required
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="********"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-12 outline-none transition focus:border-blue-600"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {confirmPassword &&
          password !== confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              كلمتا المرور غير متطابقتين
            </p>
          )}
      </div>

      {/* الشروط */}

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) =>
            setAcceptTerms(e.target.checked)
          }
        />

        أوافق على شروط الاستخدام وسياسة الخصوصية.
      </label>

      {/* زر التسجيل */}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "إنشاء الحساب"
        )}
      </button>
    </form>
  );
}