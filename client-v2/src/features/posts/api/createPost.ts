import { supabase } from "../../../lib/supabaseClient";
import type { AudienceType } from "../types/post";

interface CreatePostData {
  content: string;
  images?: File[];
  pdf?: File | null;

  audienceType: AudienceType;
}

export async function createPost({
  content,
  images = [],
  pdf,
  audienceType,
}: CreatePostData) {
  // =========================
  // Current User
  // =========================

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("يجب تسجيل الدخول");
  }

  // =========================
  // Current Profile
  // =========================

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(`
      faculty_id,
      specialty_id,
      level_id,
      module_id
    `)
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    console.error(profileError);
    throw profileError;
  }

  // =========================
  // Upload Images
  // =========================

  const imageUrls: string[] = [];

  for (const image of images) {
    const imageName = `${user.id}-${Date.now()}-${image.name}`;

    const { error } = await supabase.storage
      .from("posts")
      .upload(imageName, image, {
        upsert: true,
      });

    if (error) throw error;

    const url = supabase.storage
      .from("posts")
      .getPublicUrl(imageName).data.publicUrl;

    imageUrls.push(url);
  }

  // =========================
  // Upload PDF
  // =========================

  let pdfUrl: string | null = null;

  if (pdf) {
    const pdfName = `${user.id}-${Date.now()}-${pdf.name}`;

    const { error } = await supabase.storage
      .from("posts")
      .upload(pdfName, pdf, {
        upsert: true,
      });

    if (error) throw error;

    pdfUrl = supabase.storage
      .from("posts")
      .getPublicUrl(pdfName).data.publicUrl;
  }

  // =========================
  // Insert Post
  // =========================

  const { error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,

      content,

      images_urls: imageUrls,

      pdf_url: pdfUrl,

      audience_type: audienceType,

      faculty_id:
        audienceType === "faculty" ||
        audienceType === "specialty" ||
        audienceType === "level" ||
        audienceType === "module"
          ? profile?.faculty_id ?? null
          : null,

      specialty_id:
        audienceType === "specialty" ||
        audienceType === "level" ||
        audienceType === "module"
          ? profile?.specialty_id ?? null
          : null,

      level_id:
        audienceType === "level" ||
        audienceType === "module"
          ? profile?.level_id ?? null
          : null,

      module_id:
        audienceType === "module"
          ? profile?.module_id ?? null
          : null,
    });

  if (error) {
    console.error(error);
    throw error;
  }
}