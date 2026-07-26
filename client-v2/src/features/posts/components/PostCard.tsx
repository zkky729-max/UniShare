import PostActions from "./PostActions";
import type { Post } from "../types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={post.author.avatar || "/avatars/default.png"}
            alt={post.author.name}
            className="h-12 w-12 rounded-full border object-cover"
            onError={(e) => {
              e.currentTarget.src = "/avatars/default.png";
            }}
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900">
                {post.author.name}
              </h2>

              {post.author.role && (
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  {post.author.role}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">
              {post.createdAt}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-800">
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="mt-5 w-full rounded-xl border object-cover"
          />
        )}

        {/* PDF */}
        {post.pdf && (
          <a
            href={post.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center gap-2 rounded-xl border bg-gray-50 p-4 text-blue-600 transition hover:bg-gray-100"
          >
            📄 عرض ملف PDF
          </a>
        )}
      </div>

      <PostActions
        postId={post.id}
        comments={post.comments}
        shares={post.shares}
      />
    </article>
  );
}