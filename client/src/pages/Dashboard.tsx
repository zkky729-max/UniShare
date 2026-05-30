import { useState } from "react"
import api from "../api/axios"

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setMessage(res.data.message)
    } catch (err) {
      console.error(err)
      setMessage("Upload failed")
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="border p-6 rounded-lg max-w-md">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
        />

        <button
          onClick={handleUpload}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Upload File
        </button>

        {message && (
          <p className="mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}