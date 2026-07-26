import { supabase } from "../../../lib/supabaseClient";
import type { Post } from "../types/post";

export async function getPosts(): Promise<Post[]> {
  // جلب المنشورات
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (postsError) throw postsError;

  if (!posts || posts.length === 0) {
    return [];
  }

  // استخراج معرفات المستخدمين
  const userIds = [...new Set(posts.map((p) => p.user_id))];

  // جلب الملفات الشخصية
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, full_name, username, avatar_url")
    .in("user_id", userIds);

  if (profilesError) throw profilesError;

  const profilesMap = new Map(
    (profiles ?? []).map((profile) => [profile.user_id, profile])
  );

  return posts.map((post) => {
    const profile = profilesMap.get(post.user_id);

    return {
      id: post.id,

      author: {
        id: post.user_id,
        name:
          profile?.full_name ||
          profile?.username ||
          "مستخدم",
        avatar: profile?.avatar_url || undefined,
      },

      content: post.content,
      image: post.image_url || undefined,
      pdf: post.pdf_url || undefined,

      likes: 0,
      comments: 0,
      shares: 0,

      createdAt: new Date(post.created_at).toLocaleString("ar-DZ"),
    };
  });
}