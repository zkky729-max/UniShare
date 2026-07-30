import RoleHistoryTable from "../components/RoleHistoryTable";

import { useRoleHistory } from "../hooks/useRoleHistory";


export default function RoleHistoryPage() {


  const {
    history,
    loading,
    error,
    refresh,
  } = useRoleHistory();




  if (loading) {

    return (

      <div
        className="
          p-6
          text-center
        "
      >

        جاري تحميل سجل الأدوار...

      </div>

    );

  }





  if (error) {

    return (

      <div
        className="
          p-6
          space-y-4
        "
      >

        <p
          className="
            text-red-600
          "
        >

          {error}

        </p>


        <button

          onClick={refresh}

          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
          "

        >

          إعادة المحاولة

        </button>


      </div>

    );

  }





  return (

    <div
      className="
        p-6
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

          سجل تغييرات الأدوار

        </h1>


        <p
          className="
            text-gray-500
            mt-2
          "
        >

          متابعة جميع عمليات تغيير صلاحيات المستخدمين

        </p>


      </div>



      <RoleHistoryTable

        history={history}

      />


    </div>

  );

}