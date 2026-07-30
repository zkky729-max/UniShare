import { supabase } from "../../../lib/supabaseClient";

import type {
  UserRole,
} from "../types/admin";


export interface UpdateUserRoleData {

  userId: string;

  newRole: UserRole;

}



export async function updateUserRole({
  userId,
  newRole,
}: UpdateUserRoleData): Promise<void> {


  const {
    error,
  } = await supabase
    .from("profiles")
    .update({
      role: newRole,
    })
    .eq(
      "user_id",
      userId
    );


  if (error) {

    console.error(
      "Failed to update user role:",
      error
    );

    throw error;

  }

}