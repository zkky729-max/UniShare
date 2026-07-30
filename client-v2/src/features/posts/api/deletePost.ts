import { supabase } from "../../../lib/supabaseClient";

export async function deletePost(id: string) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}