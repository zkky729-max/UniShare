import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [count, setCount] = useState(0);

  const load = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (!data.user) return;

    const { data: files } = await supabase.storage
      .from("unishare-files")
      .list(data.user.id + "/");

    setCount(files?.length || 0);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>👤 Profile</h1>

      <div style={{ background: "#fff", padding: 20 }}>
        <p>Email: {user?.email}</p>
        <p>User ID: {user?.id}</p>
        <p>Files: {count}</p>
        <p style={{ color: "green" }}>
          💚 Free Plan - Unlimited Access
        </p>
      </div>
    </div>
  );
}