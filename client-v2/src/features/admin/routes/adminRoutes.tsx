import {
  Routes,
  Route,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboardPage from "../pages/AdminDashboardPage";
import UsersManagementPage from "../pages/UsersManagementPage";
import RoleHistoryPage from "../pages/RoleHistoryPage";


export default function AdminRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<AdminLayout />}
      >

        <Route
          index
          element={
            <AdminDashboardPage />
          }
        />


        <Route
          path="users"
          element={
            <UsersManagementPage />
          }
        />


        <Route
          path="role-history"
          element={
            <RoleHistoryPage />
          }
        />


      </Route>


    </Routes>

  );

}