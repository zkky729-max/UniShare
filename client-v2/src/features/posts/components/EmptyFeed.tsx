import { MessageSquare } from "lucide-react";


export default function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-12 text-center">


      <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-600">
        <MessageSquare size={32} />
      </div>


      <h3 className="text-lg font-semibold text-gray-900">
        No posts yet
      </h3>


      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Be the first student to share notes, announcements,
        or useful university resources.
      </p>


    </div>
  );
}