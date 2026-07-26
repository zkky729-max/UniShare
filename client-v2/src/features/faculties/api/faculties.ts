import { supabase } from "@/lib/supabaseClient";
import type { Faculty } from "../types";


export async function getFaculties(): Promise<Faculty[]> {

  const { data, error } = await supabase
    .from("faculties")
    .select("*")
    .order("name");


  if (error) {
    throw error;
  }


  return data || [];
}



export async function getFacultiesByUniversity(
  universityId: string
): Promise<Faculty[]> {

  const { data, error } = await supabase
    .from("faculties")
    .select("*")
    .eq("university_id", universityId)
    .order("name");


  if (error) {
    throw error;
  }


  return data || [];
}



export async function addFaculty(
  faculty: Omit<Faculty, "id" | "created_at">
) {

  const { data, error } = await supabase
    .from("faculties")
    .insert(faculty)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;
}



export async function deleteFaculty(
  id: string
) {

  const { error } = await supabase
    .from("faculties")
    .delete()
    .eq("id", id);


  if (error) {
    throw error;
  }

}