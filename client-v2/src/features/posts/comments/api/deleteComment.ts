import { supabase } from "../../../../lib/supabaseClient";

export async function deleteComment(
  commentId: string
) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
}