import { supabase } from "../../../lib/supabaseClient";

import type {
  AdminUser,
} from "../types/admin";



export async function getUsers(): Promise<AdminUser[]> {


  const {
    data,
    error,
  } = await supabase

    .from("profiles")

    .select(`

      id,

      user_id,

      full_name,

      username,

      avatar_url,

      bio,

      age,

      role,

      created_at,


      faculty:faculties(
        name
      ),


      specialty:specialties(
        name
      )

    `)

    .order(
      "created_at",
      {
        ascending: false,
      }
    );



  if (error) {

    throw error;

  }



  return (data ?? []).map(

    (user: any): AdminUser => ({

      id:
        user.id,


      user_id:
        user.user_id,


      full_name:
        user.full_name,


      username:
        user.username,


      avatar_url:
        user.avatar_url,


      bio:
        user.bio,


      age:
        user.age,


      role:
        user.role,


      faculty:
        user.faculty?.[0] ?? null,


      specialty:
        user.specialty?.[0] ?? null,


      created_at:
        user.created_at,

    })

  );


}