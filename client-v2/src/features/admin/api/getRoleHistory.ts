import { supabase } from "../../../lib/supabaseClient";


export interface RoleHistoryItem {

  id: string;

  user_id: string;

  old_role: string | null;

  new_role: string;

  changed_by: string;

  created_at: string;


  user: {

    full_name: string | null;

    username: string | null;

  } | null;


  changer: {

    full_name: string | null;

    username: string | null;

  } | null;

}




export async function getRoleHistory(): Promise<RoleHistoryItem[]> {


  const {
    data,
    error,
  } =
    await supabase
      .from("role_history")
      .select(`
        id,
        user_id,
        old_role,
        new_role,
        changed_by,
        created_at,

        user:profiles!role_history_user_fk(
          full_name,
          username
        ),

        changer:profiles!role_history_changed_by_fk(
          full_name,
          username
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
    (item: any) => ({

      id: item.id,

      user_id: item.user_id,

      old_role: item.old_role,

      new_role: item.new_role,

      changed_by: item.changed_by,

      created_at: item.created_at,


      user:
        item.user?.[0] ?? null,


      changer:
        item.changer?.[0] ?? null,


    })
  );

}