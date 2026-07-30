import type { UserRole } from "../../../types/roles";

export interface AdminUser {
  id: string;

  user_id: string;

  full_name: string | null;

  username: string | null;

  avatar_url: string | null;

  avatar_id: string | null;

  avatar_type: string | null;

  bio: string | null;

  age: number | null;

  faculty_id: string | null;

  specialty_id: string | null;

  level_id: string | null;

  semester_id: string | null;

  module_id: string | null;

  role: UserRole;

  created_at: string;
}