import AdminStats from "../components/AdminStats";

import { useAdminStats } from "../hooks/useAdminStats";



export default function AdminDashboardPage() {


  const {
    stats,
    loading,
    error,
  } = useAdminStats();





  if (loading) {

    return (

      <div className="p-6">

        جاري تحميل الإحصائيات...

      </div>

    );

  }





  if (error) {

    return (

      <div className="p-6 text-red-600">

        {error}

      </div>

    );

  }





  return (

    <div
      className="
        space-y-6
      "
    >


      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Admin Dashboard

        </h1>


        <p
          className="
            text-gray-500
            mt-2
          "
        >

          نظرة عامة على منصة UniShare

        </p>


      </div>



      {
        stats && (

          <AdminStats
            stats={stats}
          />

        )
      }



    </div>

  );

}