import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode
  role?: string
}) {
  const { user, profile, loading } = useAuth()

  console.log("USER:", user)
  console.log("PROFILE:", profile)
  console.log("ROLE REQUIRED:", role)

  if (loading) return <h3>Loading...</h3>

  if (!user) return <Navigate to="/login" />

  if (role && profile?.role !== role) {
    return <h3>Not authorized</h3>
  }

  return children
}