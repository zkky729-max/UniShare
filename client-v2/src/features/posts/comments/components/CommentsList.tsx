import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

import { useComments } from "../hooks/useComments";

import { useCommentsRealtime } from "../../realtime/useCommentsRealtime";


interface Props {
  postId: string;
}


export default function CommentsList({
  postId,
}: Props) {


  const {
    comments,
    loading,
    addComment,
    refresh,
  } = useComments(postId);




  // 💬 Comments Realtime
  useCommentsRealtime(
    postId,
    refresh
  );





  return (

    <div className="border-t bg-white px-5 py-4">


      <CommentInput
        onSubmit={addComment}
      />



      <div className="mt-4 space-y-3">


        {loading ? (

          <p className="text-sm text-gray-500">
            Loading comments...
          </p>


        ) : comments.length === 0 ? (


          <p className="text-sm text-gray-500">
            No comments yet.
          </p>


        ) : (


          comments.map((comment) => (

            <CommentCard

              key={comment.id}

              comment={comment}

            />

          ))


        )}


      </div>


    </div>

  );

}