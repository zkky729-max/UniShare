import { supabase } from "../../../lib/supabaseClient";
import { getPublicUrl } from "./getPublicUrl";

const BUCKET = "post-images";

export async function uploadImages(
  files: File[]
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const extension =
      file.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const { error } =
      await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
          upsert: false,
        });

    if (error) {
      throw error;
    }

    urls.push(
      getPublicUrl(
        BUCKET,
        fileName
      )
    );
  }

  return urls;
}