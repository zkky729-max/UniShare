import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";

import FacultiesPage from "./pages/university/FacultiesPage";
import FacultySpecialtiesPage from "./pages/university/FacultySpecialtiesPage";
import ModulesPage from "./pages/university/ModulesPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculties"
          element={
            <ProtectedRoute>
              <FacultiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/specialties/:facultyId"
          element={
            <ProtectedRoute>
              <FacultySpecialtiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules/:specialtyId"
          element={
            <ProtectedRoute>
              <ModulesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}