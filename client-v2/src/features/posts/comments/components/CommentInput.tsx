import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSubmit: (content: string) => Promise<void>;
}

export default function CommentInput({
  onSubmit,
}: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    try {
      setLoading(true);

      await onSubmit(content);

      setContent("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 flex gap-3">
      <input
        type="text"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-4 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </div>
  );
}