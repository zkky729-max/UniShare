import { supabase } from "../../../../lib/supabaseClient";
import type { Comment } from "../types/comment";

export async function getComments(
  postId: string
): Promise<Comment[]> {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  if (!comments?.length) {
    return [];
  }

  const userIds = [
    ...new Set(
      comments.map((c) => c.user_id)
    ),
  ];

  const {
    data: profiles,
    error: profilesError,
  } = await supabase
    .from("profiles")
    .select(
      "user_id, full_name, username, avatar_url"
    )
    .in("user_id", userIds);

  if (profilesError) throw profilesError;

  const profilesMap = new Map(
    (profiles ?? []).map((p) => [
      p.user_id,
      p,
    ])
  );

  return comments.map((comment) => {
    const profile = profilesMap.get(
      comment.user_id
    );

    return {
      id: comment.id,

      postId: comment.post_id,

      content: comment.content,

      createdAt: new Date(
        comment.created_at
      ).toLocaleString("ar-DZ"),

      author: {
        id: comment.user_id,
        name:
          profile?.full_name ||
          profile?.username ||
          "مستخدم",
        avatar:
          profile?.avatar_url ||
          undefined,
      },
    };
  });
}