import { useCallback, useEffect, useState } from "react";

import { getPosts } from "../api/getPosts";
import type { Post } from "../types/post";


export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPosts();

      setPosts(data);

    } catch (err) {

      console.error(
        "Failed to load posts:",
        err
      );

      setError(
        err instanceof Error
          ? err
          : new Error("Unknown error")
      );

    } finally {

      setLoading(false);

    }
  }, []);


  useEffect(() => {
    refresh();
  }, [refresh]);


  return {
    posts,
    loading,
    error,
    refresh,
  };
}