import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "../../../lib/supabaseClient";
import type { UserRole } from "../../../types/roles";

export interface Profile {
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

interface AuthContextType {
  user: User | null;

  profile: Profile | null;

  loading: boolean;

  signOut: () => Promise<void>;

  reloadProfile: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadProfile(userId: string) {
    const {
      data,
      error,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error(
        "Profile loading error:",
        error.message
      );

      if (
        error.message.includes(
          "JWT expired"
        )
      ) {
        await supabase.auth.signOut();

        setUser(null);
      }

      setProfile(null);

      return;
    }

    setProfile(data as Profile);
  }

  async function reloadProfile() {
    if (!user) return;

    await loadProfile(user.id);
  }

  useEffect(() => {
    async function initAuth() {
      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      const currentUser =
        session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser.id);
      }

      setLoading(false);
    }

    initAuth();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          session
        ) => {
          const currentUser =
            session?.user ?? null;

          setUser(currentUser);

          if (currentUser) {
            await loadProfile(
              currentUser.id
            );
          } else {
            setProfile(null);
          }

          setLoading(false);
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();

    setUser(null);

    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be inside AuthProvider"
    );
  }

  return context;
}