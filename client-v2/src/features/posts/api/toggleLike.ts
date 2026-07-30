import { supabase } from "../../../lib/supabaseClient";

export async function toggleLike(
  postId: string,
  liked: boolean
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  if (liked) {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    if (error) throw error;

    return false;
  }

  const { error } = await supabase
    .from("post_likes")
    .insert({
      post_id: postId,
      user_id: user.id,
    });

  if (error) throw error;

  return true;
}