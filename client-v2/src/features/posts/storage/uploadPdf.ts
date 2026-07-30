import { supabase } from "../../../lib/supabaseClient";
import { getPublicUrl } from "./getPublicUrl";

const BUCKET = "post-pdfs";

export interface UploadedPdf {
  url: string;
  name: string;
}

export async function uploadPdf(
  file: File
): Promise<UploadedPdf> {
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

  return {
    url: getPublicUrl(
      BUCKET,
      fileName
    ),
    name: file.name,
  };
}