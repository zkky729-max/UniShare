import { supabase } from "../lib/supabase";

export async function getFaculties() {
  const { data, error } = await supabase
    .from("faculties")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function getSpecialties(facultyId: string) {
  const { data, error } = await supabase
    .from("specialties")
    .select("*")
    .eq("faculty_id", facultyId)
    .order("name");

  if (error) throw error;

  return data;
}