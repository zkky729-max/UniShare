import { Router } from "express"
import multer from "multer"
import path from "path"

const router = Router()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/")
  },

  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    })
  }

  res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
  })
})

export default router