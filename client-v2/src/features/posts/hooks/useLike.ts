import { useEffect, useState } from "react";
import { getLikes } from "../api/getLikes";
import { toggleLike } from "../api/toggleLike";

export function useLike(postId: string) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadLikes() {
    try {
      const data = await getLikes(postId);
      setLikes(data.count);
      setLiked(data.liked);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadLikes();
  }, [postId]);

  async function handleLike() {
    if (loading) return;

    try {
      setLoading(true);

      const isLiked = await toggleLike(postId);

      setLiked(isLiked);

      setLikes((prev) =>
        isLiked ? prev + 1 : Math.max(prev - 1, 0)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    likes,
    liked,
    loading,
    handleLike,
  };
}