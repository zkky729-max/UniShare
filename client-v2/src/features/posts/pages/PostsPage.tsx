import CreatePost from "../components/CreatePost";
import EmptyFeed from "../components/EmptyFeed";
import FeedSkeleton from "../components/FeedSkeleton";
import FeedTabs from "../components/FeedTabs";
import PostCard from "../components/PostCard";

import {
  FeedProvider,
  useFeed,
} from "../context/FeedContext";

interface PostsPageProps {
  embedded?: boolean;
}

function PostsPageContent({
  embedded = false,
}: PostsPageProps) {

  const {
    posts,
    loading,
    activeFilter,
    setActiveFilter,
  } = useFeed();

  // للتشخيص فقط
  console.log("Current Filter:", activeFilter);

  if (loading) {
    return (
      <div
        className={
          embedded
            ? "space-y-6"
            : "mx-auto max-w-3xl space-y-6 px-4 py-8"
        }
      >
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  return (
    <div
      className={
        embedded
          ? "space-y-6"
          : "mx-auto max-w-3xl space-y-6 px-4 py-8"
      }
    >
      {!embedded && (
        <div>
          <h1 className="text-3xl font-bold">
            Feed
          </h1>

          <p className="mt-2 text-gray-500">
            Share notes, announcements and university news.
          </p>
        </div>
      )}

      <FeedTabs
        activeTab={activeFilter}
        onChange={setActiveFilter}
      />

      <CreatePost />

      <div className="space-y-6">
        {posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function PostsPage(
  props: PostsPageProps
) {
  return (
    <FeedProvider>
      <PostsPageContent {...props} />
    </FeedProvider>
  );
}