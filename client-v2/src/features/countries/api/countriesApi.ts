import { supabase } from "@/lib/supabaseClient";
import type { Country } from "../types";
export async function getCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data || [];
}