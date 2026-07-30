import { useState } from "react";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import PostActions from "./PostActions";

import DeletePostDialog from "./DeletePostDialog";
import EditPostDialog from "./EditPostDialog";

import CommentsList from "../comments/components/CommentsList";

import { useFeed } from "../context/FeedContext";

import type { Post } from "../types/post";


interface Props {
  post: Post;
}


export default function PostCard({
  post,
}: Props) {


  const {
    deletePost,
    updatePost,
  } = useFeed();




  const [showComments, setShowComments] =
    useState(false);


  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);


  const [showEditDialog, setShowEditDialog] =
    useState(false);


  const [deleting, setDeleting] =
    useState(false);


  const [updating, setUpdating] =
    useState(false);







  async function confirmDelete() {

    try {

      setDeleting(true);

      await deletePost(post.id);


    } catch(error) {

      console.error(
        "Delete error:",
        error
      );


    } finally {

      setDeleting(false);

      setShowDeleteDialog(false);

    }

  }








  async function confirmUpdate(
    content:string
  ) {


    try {


      setUpdating(true);


      await updatePost({

        id: post.id,

        content,

      });



    } catch(error) {


      console.error(
        "Update error:",
        error
      );


    } finally {


      setUpdating(false);

      setShowEditDialog(false);


    }


  }








  return (

    <>

      <article

        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg
        "

      >


        <div className="p-5">



          <PostHeader

            author={post.author}

            createdAt={post.createdAt}

            isOwner={post.isOwner}

            onEdit={() =>
              setShowEditDialog(true)
            }

            onDelete={() =>
              setShowDeleteDialog(true)
            }

          />





          <PostContent

            content={post.content}

          />







          <PostMedia

            image={post.image}

            pdf={post.pdf}

          />







          <PostFooter

            likes={post.likes}

            comments={post.comments}

            shares={post.shares}

          />



        </div>






        <PostActions

          postId={post.id}

          showComments={showComments}

          onComment={() =>
            setShowComments(
              prev => !prev
            )
          }

          onShare={() => {}}

        />








        {showComments && (

          <CommentsList

            postId={post.id}

          />

        )}



      </article>









      <DeletePostDialog

        open={showDeleteDialog}

        loading={deleting}

        onClose={() =>
          setShowDeleteDialog(false)
        }

        onConfirm={confirmDelete}

      />









      <EditPostDialog

        open={showEditDialog}

        loading={updating}

        initialContent={post.content}

        onClose={() =>
          setShowEditDialog(false)
        }

        onSave={confirmUpdate}

      />



    </>

  );

}