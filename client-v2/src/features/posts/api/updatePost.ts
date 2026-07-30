import { supabase } from "../../../lib/supabaseClient";

export async function updatePost(
  id: string,
  content: string
) {
  const { data, error } = await supabase
    .from("posts")
    .update({
      content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}