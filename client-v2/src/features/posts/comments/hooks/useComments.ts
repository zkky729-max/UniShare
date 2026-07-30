import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { createComment } from "../api/createComment";
import { deleteComment } from "../api/deleteComment";
import { getComments } from "../api/getComments";

import type { Comment } from "../types/comment";


export function useComments(
  postId: string
) {


  const [comments, setComments] =
    useState<Comment[]>([]);


  const [loading, setLoading] =
    useState(true);





  const refresh = useCallback(
    async () => {

      try {

        setLoading(true);


        const data =
          await getComments(postId);


        setComments(data);


      } catch (err) {

        console.error(
          "Load comments failed:",
          err
        );


      } finally {

        setLoading(false);

      }

    },
    [postId]
  );







  useEffect(() => {

    void refresh();

  }, [refresh]);









  async function addComment(
    content: string
  ) {

    if (!content.trim()) return;


    try {


      await createComment(
        postId,
        content
      );


      await refresh();



    } catch (err) {

      console.error(
        "Create comment failed:",
        err
      );

    }

  }









  async function removeComment(
    commentId: string
  ) {

    try {


      await deleteComment(
        commentId
      );


      setComments((current) =>
        current.filter(
          (comment) =>
            comment.id !== commentId
        )
      );


    } catch (err) {

      console.error(
        "Delete comment failed:",
        err
      );

    }

  }







  return {

    comments,

    loading,

    addComment,

    removeComment,

    refresh,

  };

}