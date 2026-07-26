import CreatePost from "../components/CreatePost";
import EmptyFeed from "../components/EmptyFeed";
import PostCard from "../components/PostCard";

import { usePosts } from "../hooks/usePosts";


interface PostsPageProps {
  embedded?: boolean;
}


export default function PostsPage({
  embedded = false,
}: PostsPageProps) {


  const {
    posts,
    loading,
    error,
    refresh,
  } = usePosts();



  if (loading) {

    return (
      <div className="flex justify-center py-10">
        Loading posts...
      </div>
    );

  }



  if (error) {

    return (

      <div className="flex flex-col items-center gap-4 py-10">

        <p className="text-red-500">
          Failed to load posts
        </p>


        <button
          onClick={refresh}
          className="
          rounded-lg
          bg-black
          px-4
          py-2
          text-white
          "
        >
          Retry
        </button>


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



      {/* Header يظهر فقط في صفحة Posts */}

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






      {/* Create Post */}

      <CreatePost
        onSuccess={refresh}
      />






      {/* Posts */}

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