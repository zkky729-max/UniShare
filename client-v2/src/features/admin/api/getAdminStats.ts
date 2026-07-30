import { supabase } from "../../../lib/supabaseClient";


export interface AdminStats {

  totalUsers: number;

  students: number;

  eliteStudents: number;

  professors: number;

  admins: number;

}



export async function getAdminStats(): Promise<AdminStats> {


  const {
    data,
    error,
  } =
    await supabase
      .from("profiles")
      .select("role");



  if (error) {

    throw error;

  }



  const profiles =
    data ?? [];



  return {

    totalUsers:
      profiles.length,


    students:
      profiles.filter(
        user =>
          user.role === "student"
      ).length,


    eliteStudents:
      profiles.filter(
        user =>
          user.role === "elite_student"
      ).length,


    professors:
      profiles.filter(
        user =>
          user.role === "professor"
      ).length,


    admins:
      profiles.filter(
        user =>
          user.role === "admin"
      ).length,

  };

}