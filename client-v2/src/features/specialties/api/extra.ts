import { supabase } from "../../../lib/supabaseClient";

/* ===================== EXAMS ===================== */

export async function getExams(specialtyId: string) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("specialty_id", specialtyId);

  if (error) throw error;
  return data;
}

export async function addExam(
  title: string,
  file_url: string,
  specialtyId: string
) {
  const { error } = await supabase
    .from("exams")
    .insert([
      {
        title,
        file_url,
        specialty_id: specialtyId,
      },
    ]);

  if (error) throw error;
}

/* ===================== RESOURCES ===================== */

export async function getResources(specialtyId: string) {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("specialty_id", specialtyId);

  if (error) throw error;
  return data;
}

export async function addResource(
  title: string,
  link: string,
  specialtyId: string
) {
  const { error } = await supabase
    .from("resources")
    .insert([
      {
        title,
        link,
        specialty_id: specialtyId,
      },
    ]);

  if (error) throw error;
}