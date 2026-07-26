import { Router } from "express";
import { supabase } from "../supabaseClient";

const router = Router();

router.get("/usage", async (req, res) => {
  try {
    const { data: files, error } = await supabase.storage
      .from("uploads")
      .list("", {
        limit: 1000
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    let totalSize = 0;
    let images = 0;
    let pdfs = 0;
    let videos = 0;
    let others = 0;

    const formatted = (files || []).map((file: any) => {
      const size = file.metadata?.size || 0;
      totalSize += size;

      const ext = file.name.split(".").pop()?.toLowerCase();

      if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
        images++;
      } else if (ext === "pdf") {
        pdfs++;
      } else if (["mp4", "mov", "avi"].includes(ext)) {
        videos++;
      } else {
        others++;
      }

      return {
        name: file.name,
        size
      };
    });

    return res.json({
      success: true,
      totalSize,
      fileCount: files?.length || 0,
      images,
      pdfs,
      videos,
      others,
      files: formatted
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;