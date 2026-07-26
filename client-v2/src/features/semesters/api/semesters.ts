import { supabase } from "@/lib/supabaseClient";
import type { Semester } from "../types";

export async function getSemestersByLevel(
  levelId: string
): Promise<Semester[]> {
  const { data, error } = await supabase
    .from("semesters")
    .select("*")
    .eq("level_id", levelId)
    .order("semester_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Semester[];
}