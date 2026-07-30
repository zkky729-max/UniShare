import type { Comment } from "../types/comment";

interface Props {
  comment: Comment;
}

export default function CommentCard({
  comment,
}: Props) {
  return (
    <div className="flex gap-3 rounded-xl border bg-gray-50 p-3">
      <img
        src={comment.author.avatar || "/avatars/default.png"}
        alt={comment.author.name}
        className="h-10 w-10 rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/avatars/default.png";
        }}
      />

      <div className="flex-1">
        <h4 className="font-semibold">
          {comment.author.name}
        </h4>

        <p className="mt-1 text-gray-700">
          {comment.content}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          {comment.createdAt}
        </p>
      </div>
    </div>
  );
}