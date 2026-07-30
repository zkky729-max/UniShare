import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  loading?: boolean;
  initialContent: string;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function EditPostDialog({
  open,
  loading = false,
  initialContent,
  onClose,
  onSave,
}: Props) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-xl font-bold">
              Edit Post
            </h2>

            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="What's new?"
              className="w-full resize-none rounded-xl border p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t p-6 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-6 py-2 transition hover:bg-gray-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(content)}
              disabled={loading || !content.trim()}
              className="rounded-xl bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}