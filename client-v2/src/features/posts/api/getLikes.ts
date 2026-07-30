import { supabase } from "../../../lib/supabaseClient";

export async function getLikes(postId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // عدد الإعجابات
  const { count, error: countError } = await supabase
    .from("post_likes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("post_id", postId);

  if (countError) throw countError;

  // هل المستخدم أعجب بالمنشور؟
  const { data, error: likedError } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  if (likedError) throw likedError;

  return {
    count: count ?? 0,
    liked: !!data,
  };
}