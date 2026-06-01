type Props = {
  folders: string[];
  current: string;
  setCurrent: (f: string) => void;
  createFolder: (name: string) => void;
};

export default function SidebarExplorer({
  folders,
  current,
  setCurrent,
  createFolder,
}: Props) {
  return (
    <div style={styles.sidebar}>
      <h3>📁 Folders</h3>

      <div
        style={{
          ...styles.item,
          background: current === "root" ? "#ddd" : "",
        }}
        onClick={() => setCurrent("root")}
      >
        📂 root
      </div>

      {folders.map((f, i) => (
        <div
          key={i}
          style={{
            ...styles.item,
            background: current === f ? "#ddd" : "",
          }}
          onClick={() => setCurrent(f)}
        >
          📁 {f}
        </div>
      ))}

      <input
        placeholder="New folder"
        style={styles.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createFolder((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />
    </div>
  );
}

const styles: any = {
  sidebar: {
    width: 200,
    padding: 15,
    background: "#111",
    color: "#fff",
    minHeight: "100vh",
  },
  item: {
    padding: 8,
    cursor: "pointer",
    borderRadius: 5,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    marginTop: 10,
    padding: 5,
  },
};