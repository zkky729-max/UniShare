import type { User } from "@supabase/supabase-js";


export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}


export interface AuthContextType {

  user: User | null;

  profile: Profile | null;

  loading: boolean;

  signOut: () => Promise<void>;

}