import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log(
  "SUPABASE KEY:",
  supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "undefined"
);

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is missing");
}

if (!supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY is missing");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);