import PostMenu from "./PostMenu";

interface PostHeaderProps {
  author: {
    name: string;
    avatar?: string;
  };

  createdAt: string;

  isOwner: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostHeader({
  author,
  createdAt,
  isOwner,
  onEdit,
  onDelete,
}: PostHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-3">
        <img
          src={author.avatar || "/avatars/default.png"}
          alt={author.name}
          className="h-11 w-11 rounded-full border object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-900">
            {author.name}
          </h3>

          <p className="text-sm text-gray-500">
            {createdAt}
          </p>
        </div>
      </div>

      {isOwner && (
        <PostMenu
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}