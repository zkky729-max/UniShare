import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";


export default function DashboardLayout() {


  return (

    <div
      className="
      min-h-screen
      bg-gray-100
      flex
      "
    >


      {/* Sidebar */}

      <Sidebar />




      {/* Main */}

      <div
        className="
        flex-1
        flex
        flex-col
        "
      >


        <Navbar />



        <main
          className="
          p-6
          "
        >

          <Outlet />

        </main>



      </div>



    </div>

  );

}