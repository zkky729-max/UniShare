import { supabase } from "../../../lib/supabaseClient";

export async function getSubjectsBySpecialty(specialtyId: string) {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("specialty_id", specialtyId);

  if (error) throw error;
  return data;
}

export async function addSubject(
  name: string,
  description: string,
  specialtyId: string
) {
  const { data, error } = await supabase
    .from("subjects")
    .insert([
      {
        name,
        description,
        specialty_id: specialtyId,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function deleteSubject(id: string) {
  const { error } = await supabase
    .from("subjects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}