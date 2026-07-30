import { supabase } from "../../../lib/supabaseClient";

export function getPublicUrl(
  bucket: string,
  path: string
): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}