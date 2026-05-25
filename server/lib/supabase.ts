import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xxxxxxxx.supabase.co"

const supabaseKey = "eyJxxxxxxxxxxxxxxxx"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)