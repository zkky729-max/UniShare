import { supabase } from "../../../lib/supabaseClient";

export async function toggleLike(postId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("يجب تسجيل الدخول");
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;

    return false;
  }

  const { error } = await supabase
    .from("likes")
    .insert({
      post_id: postId,
      user_id: user.id,
    });

  if (error) throw error;

  return true;
}