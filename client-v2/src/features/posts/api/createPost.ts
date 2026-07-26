import { supabase } from "../../../lib/supabaseClient";

interface CreatePostData {
  content: string;
  image?: File | null;
  pdf?: File | null;
}

export async function createPost({
  content,
  image,
  pdf,
}: CreatePostData) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("يجب تسجيل الدخول");
  }

  let imageUrl: string | null = null;
  let pdfUrl: string | null = null;

  // رفع الصورة
  if (image) {
    const imageName = `${user.id}-${Date.now()}-${image.name}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(imageName, image, {
        upsert: true,
      });

    console.log("Image Upload:", data);

    if (error) {
      console.error("Image Upload Error:", error);
      throw error;
    }

    imageUrl = supabase.storage
      .from("posts")
      .getPublicUrl(imageName).data.publicUrl;
  }

  // رفع PDF
  if (pdf) {
    const pdfName = `${user.id}-${Date.now()}-${pdf.name}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(pdfName, pdf, {
        upsert: true,
      });

    console.log("PDF Upload:", data);

    if (error) {
      console.error("PDF Upload Error:", error);
      throw error;
    }

    pdfUrl = supabase.storage
      .from("posts")
      .getPublicUrl(pdfName).data.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
    image_url: imageUrl,
    pdf_url: pdfUrl,
  });

  if (error) {
    console.error("Insert Error:", error);
    throw error;
  }
}