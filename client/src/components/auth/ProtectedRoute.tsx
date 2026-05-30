import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "../../context/AuthContext"

type Props = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}