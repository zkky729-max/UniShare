export type UserRole =
  | "student"
  | "elite_student"
  | "professor"
  | "admin";



export interface AdminUser {

  user_id: string;

  full_name: string | null;

  email: string | null;

  username?: string | null;

  avatar_url?: string | null;


  role: UserRole;


  faculty?: {

    name: string;

  } | null;



  specialty?: {

    name: string;

  } | null;



  created_at: string;

}