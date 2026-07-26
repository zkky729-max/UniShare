import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import { useLike } from "../hooks/useLike";

interface Props {
  postId: string;
  comments: number;
  shares: number;

  onComment?: () => void;
  onShare?: () => void;
}

export default function PostActions({
  postId,
  comments,
  shares,
  onComment,
  onShare,
}: Props) {

  const {
    likes,
    liked,
    loading,
    handleLike,
  } = useLike(postId);

  return (
    <div className="flex justify-around border-t py-3">

      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-2 transition ${
          liked
            ? "text-red-500"
            : "hover:text-red-500"
        }`}
      >
        <Heart
          size={20}
          fill={liked ? "currentColor" : "none"}
        />

        <span>{likes}</span>
      </button>

      <button
        onClick={onComment}
        className="flex items-center gap-2 transition hover:text-blue-500"
      >
        <MessageCircle size={20} />

        <span>{comments}</span>
      </button>

      <button
        onClick={onShare}
        className="flex items-center gap-2 transition hover:text-green-600"
      >
        <Share2 size={20} />

        <span>{shares}</span>
      </button>

    </div>
  );
}