import { supabase } from "../../../lib/supabaseClient";

export async function getLikes(postId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("likes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("post_id", postId);

  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  return {
    count: count ?? 0,
    liked: !!data,
  };
}