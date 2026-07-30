import { Outlet } from "react-router-dom";


export default function AdminLayout() {

  console.log(
    "ADMIN LAYOUT RENDERED"
  );


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >

        ADMIN LAYOUT WORKS

      </h1>


      <div
        style={{
          marginTop: "20px",
        }}
      >

        <Outlet />

      </div>


    </div>

  );

}