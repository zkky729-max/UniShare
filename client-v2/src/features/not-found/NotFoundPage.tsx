import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p>Page Not Found</p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}