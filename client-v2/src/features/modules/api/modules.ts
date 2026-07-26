import { supabase } from "@/lib/supabaseClient";
import type { Module } from "../types";

export async function getModulesBySemester(
  semesterId: string
): Promise<Module[]> {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("semester_id", semesterId)
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Module[];
}