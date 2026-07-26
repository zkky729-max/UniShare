import { supabase } from "../../../lib/supabaseClient";
import type { CreateLevel, Level } from "../types";


export async function getLevelsBySpecialty(
  specialtyId: string
): Promise<Level[]> {

  const { data, error } = await supabase
    .from("levels")
    .select("*")
    .eq("specialty_id", specialtyId)
    .order("created_at", { ascending: true });


  if (error) {
    console.error("Error fetching levels:", error);
    throw error;
  }


  return data ?? [];
}



export async function addLevel(
  level: CreateLevel
): Promise<Level | null> {

  const { data, error } = await supabase
    .from("levels")
    .insert([level])
    .select()
    .single();


  if (error) {
    console.error("Error adding level:", error);
    throw error;
  }


  return data;
}



export async function updateLevel(
  id: string,
  level: Partial<CreateLevel>
): Promise<void> {

  const { error } = await supabase
    .from("levels")
    .update(level)
    .eq("id", id);


  if (error) {
    console.error("Error updating level:", error);
    throw error;
  }
}



export async function deleteLevel(
  id: string
): Promise<void> {

  const { error } = await supabase
    .from("levels")
    .delete()
    .eq("id", id);


  if (error) {
    console.error("Error deleting level:", error);
    throw error;
  }
}