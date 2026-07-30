import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import { useState } from "react";

import { useFeed } from "../context/FeedContext";


interface Props {

  postId: string;

  showComments?: boolean;

  onComment?: () => void;

  onShare?: () => void;

}



export default function PostActions({

  postId,

  showComments = false,

  onComment,

  onShare,

}: Props) {


  const {
    posts,
    toggleLike,
  } = useFeed();



  const post =
    posts.find(
      (item) =>
        item.id === postId
    );



  const [loading, setLoading] =
    useState(false);



  if (!post) {
    return null;
  }



  const likedByMe =
    post.likedByMe;



  async function handleLike() {

    try {

      setLoading(true);


      await toggleLike(
        postId,
        likedByMe
      );


    } catch(error) {

      console.error(
        "Like error:",
        error
      );


    } finally {

      setLoading(false);

    }

  }




  return (

    <div className="grid grid-cols-3 border-t">


      <button

        onClick={handleLike}

        disabled={loading}

        className={`flex items-center justify-center gap-2 py-3 transition hover:bg-gray-50 ${
          likedByMe
            ? "text-red-500"
            : "text-gray-600 hover:text-red-500"
        }`}

      >

        <Heart

          size={20}

          fill={
            likedByMe
              ? "currentColor"
              : "none"
          }

        />


        <span className="font-medium">
          Like
        </span>


      </button>






      <button

        onClick={onComment}

        className={`flex items-center justify-center gap-2 py-3 transition hover:bg-gray-50 ${
          showComments
            ? "text-blue-600"
            : "text-gray-600"
        }`}

      >

        <MessageCircle size={20}/>


        <span className="font-medium">
          Comment
        </span>


      </button>







      <button

        onClick={onShare}

        className="
        flex
        items-center
        justify-center
        gap-2
        py-3
        text-gray-600
        transition
        hover:bg-gray-50
        "

      >

        <Share2 size={20}/>


        <span className="font-medium">
          Share
        </span>


      </button>


    </div>

  );

}