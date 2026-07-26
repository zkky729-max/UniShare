import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://hrvntibvfywcrsdxjgay.supabase.co";
const supabaseKey = "sb_publishable_L7mG48WsbPkjD1YEMCmVCA_1g7QSxkc";

export const supabase = createClient(supabaseUrl, supabaseKey);