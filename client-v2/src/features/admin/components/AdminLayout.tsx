import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";


export default function AdminLayout() {

  return (

    <div
      className="
        min-h-screen
        flex
        bg-gray-100
      "
    >

      <AdminSidebar />


      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <AdminHeader />


        <main
          className="
            flex-1
            p-6
          "
        >

          <Outlet />

        </main>


      </div>


    </div>

  );

}