import { supabase } from "../../../../lib/supabaseClient";

export async function createComment(
  postId: string,
  content: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      user_id: user.id,
      content,
    });

  if (error) throw error;
}