import { supabase } from "../../../lib/supabaseClient";

export async function getSpecialtiesByFaculty(facultyId: string) {
  const { data, error } = await supabase
    .from("specialties")
    .select("*")
    .eq("faculty_id", facultyId);

  if (error) throw error;
  return data;
}

export async function addSpecialty(
  name: string,
  description: string,
  facultyId: string
) {
  const { data, error } = await supabase
    .from("specialties")
    .insert([
      {
        name,
        description,
        faculty_id: facultyId,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function deleteSpecialty(id: string) {
  const { error } = await supabase
    .from("specialties")
    .delete()
    .eq("id", id);

  if (error) throw error;
}