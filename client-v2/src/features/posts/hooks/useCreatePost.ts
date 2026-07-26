import { useState } from "react";

import { createPost } from "../api/createPost";
import type { CreatePostInput } from "../types/post";


export function useCreatePost() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  async function submitPost(
    input: CreatePostInput
  ) {

    try {

      setLoading(true);
      setError(null);


      const data = await createPost(input);


      return data;


    } catch (err) {


      const error =
        err instanceof Error
          ? err
          : new Error("Failed to create post");


      setError(error);

      throw error;


    } finally {

      setLoading(false);

    }
  }


  return {
    submitPost,
    loading,
    error,
  };
}