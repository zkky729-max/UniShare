import { Routes, Route, Navigate } from "react-router-dom"

import Admin from "./pages/Admin"
import Login from "./pages/auth/Login"

import SpecialtiesPage from "./pages/admin/SpecialtiesPage"
import ModulesPage from "./pages/admin/ModulesPage"
import YearsPage from "./pages/admin/YearsPage"

import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/specialties"
          element={
            <ProtectedRoute role="admin">
              <SpecialtiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/modules"
          element={
            <ProtectedRoute role="admin">
              <ModulesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/years"
          element={
            <ProtectedRoute role="admin">
              <YearsPage />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />

      </Routes>
    </AuthProvider>
  )
}

export default App