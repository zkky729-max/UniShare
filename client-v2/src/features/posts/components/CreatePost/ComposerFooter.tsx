import { Send } from "lucide-react";

interface ComposerFooterProps {
  loading: boolean;
  message: string;
}

export default function ComposerFooter({
  loading,
  message,
}: ComposerFooterProps) {
  return (
    <>
      <button
        type="submit"
        disabled={loading}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-bold
          text-white
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        <Send size={18} />

        {loading ? "جاري النشر..." : "نشر"}
      </button>

      {message && (
        <p className="text-center font-semibold text-green-600">
          {message}
        </p>
      )}
    </>
  );
}