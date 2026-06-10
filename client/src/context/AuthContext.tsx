import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Profile = {
  id: string
  full_name: string
  avatar_url: string | null
  role: string
}

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()

    const { data } = supabase.auth.onAuthStateChange(() => {
      init()
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  async function init() {
    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    setUser(user)

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      setProfile(profile || null)
    } else {
      setProfile(null)
    }

    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}