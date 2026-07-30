import { supabase } from "../../../lib/supabaseClient";

export async function deleteFile(
  bucket: string,
  path: string
) {
  const { error } =
    await supabase.storage
      .from(bucket)
      .remove([path]);

  if (error) {
    throw error;
  }
}