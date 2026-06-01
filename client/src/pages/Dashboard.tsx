import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type FileItem = {
  name: string;
  publicUrl: string;
  path: string;
  folder: string;
};

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders] = useState<string[]>(["root", "Documents", "Images", "Videos"]);
  const [currentFolder, setCurrentFolder] = useState("root");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  };

  // 📤 upload
  const uploadFile = async () => {
    if (!file) return;

    const user = await getUser();
    if (!user) return;

    const fileName = `${Date.now()}-${file.name}`;
    const filePath =
      currentFolder === "root"
        ? `${user.id}/${fileName}`
        : `${user.id}/${currentFolder}/${fileName}`;

    const { error } = await supabase.storage
      .from("unishare-files")
      .upload(filePath, file);

    if (error) {
      setMsg("❌ Upload failed");
    } else {
      setMsg("✅ Uploaded successfully");
      setFile(null);
      fetchFiles();
    }
  };

  // 📥 fetch
  const fetchFiles = async () => {
    const user = await getUser();
    if (!user) return;

    const all: FileItem[] = [];

    for (const f of folders) {
      const path = `${user.id}/${f === "root" ? "" : f}`;

      const { data } = await supabase.storage
        .from("unishare-files")
        .list(path);

      if (!data) continue;

      data.forEach((file) => {
        const fullPath =
          f === "root"
            ? `${user.id}/${file.name}`
            : `${user.id}/${f}/${file.name}`;

        const { data: url } = supabase.storage
          .from("unishare-files")
          .getPublicUrl(fullPath);

        all.push({
          name: file.name,
          publicUrl: url.publicUrl,
          path: fullPath,
          folder: f,
        });
      });
    }

    setFiles(all);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // 🔍 filter
  const filtered = files
    .filter((f) => f.folder === currentFolder)
    .filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={styles.container}>
      <h2>📁 UniShare</h2>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* FOLDER SELECT */}
      <select
        value={currentFolder}
        onChange={(e) => setCurrentFolder(e.target.value)}
        style={styles.select}
      >
        {folders.map((f, i) => (
          <option key={i} value={f}>
            📁 {f}
          </option>
        ))}
      </select>

      {/* UPLOAD */}
      <div style={styles.uploadBox}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button onClick={uploadFile} style={styles.button}>
          📤 Upload
        </button>

        {msg && <p>{msg}</p>}
      </div>

      {/* FILES */}
      <div style={styles.grid}>
        {filtered.map((f, i) => (
          <div key={i} style={styles.card}>
            📄 {f.name}

            <a href={f.publicUrl} target="_blank">
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 styles */
const styles: any = {
  container: {
    padding: 15,
    fontFamily: "Arial",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  select: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  uploadBox: {
    background: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    background: "black",
    color: "white",
    border: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },
  card: {
    background: "#fff",
    padding: 10,
    borderRadius: 8,
  },
};