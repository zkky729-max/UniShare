export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Blur Circle 1 */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl animate-pulse" />

      {/* Blur Circle 2 */}
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />

      {/* Blur Circle 3 */}
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />

    </div>
  );
}