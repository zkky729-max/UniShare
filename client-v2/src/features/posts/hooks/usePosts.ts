import { useEffect, useState } from "react";

import { getPosts } from "../api/getPosts";
import { deletePost } from "../api/deletePost";
import { updatePost } from "../api/updatePost";
import { toggleLike } from "../api/toggleLike";

import type { Post } from "../types/post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);

      const data = await getPosts();

      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function removePost(id: string) {
    try {
      await deletePost(id);

      setPosts((prev) =>
        prev.filter((post) => post.id !== id)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function editPost(
    id: string,
    content: string
  ) {
    try {
      const updated = await updatePost(id, content);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                content: updated.content,
              }
            : post
        )
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function likePost(
    id: string,
    liked: boolean
  ) {
    // نحفظ الحالة السابقة للرجوع إليها عند الفشل
    const currentPost = posts.find(
      (post) => post.id === id
    );

    if (!currentPost) return;

    // Optimistic Update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likedByMe: !liked,
              likes: liked
                ? Math.max(post.likes - 1, 0)
                : post.likes + 1,
            }
          : post
      )
    );

    try {
      await toggleLike(id, liked);
    } catch (err) {
      console.error(err);

      // Rollback
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? currentPost
            : post
        )
      );

      throw err;
    }
  }

  return {
    posts,
    loading,
    error,
    refresh,
    removePost,
    editPost,
    likePost,
  };
}