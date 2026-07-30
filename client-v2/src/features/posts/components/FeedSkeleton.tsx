export default function FeedSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-gray-200" />

        <div className="flex-1">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-3">
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between border-t pt-4">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}