import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      })

      console.log("SUCCESS:", res.data)

      authLogin(res.data.token, res.data.user)

      navigate("/dashboard")
    } catch (error: any) {
      console.log("ERROR:", error.response?.data)
      console.error(error)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}