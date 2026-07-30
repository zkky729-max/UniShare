import type { RoleHistoryItem } from "../api/getRoleHistory";


interface Props {

  history: RoleHistoryItem[];

}



function roleLabel(
  role: string | null
) {

  switch(role){

    case "student":
      return "🎓 Student";

    case "elite_student":
      return "⭐ Elite Student";

    case "professor":
      return "👨‍🏫 Professor";

    case "admin":
      return "👑 Admin";

    default:
      return role ?? "-";

  }

}



export default function RoleHistoryTable({
  history,
}: Props) {


  if(history.length === 0){

    return (

      <div
        className="
          p-8
          text-center
          text-gray-500
        "
      >

        لا توجد تغييرات في الأدوار

      </div>

    );

  }



  return (

    <div
      className="
        overflow-x-auto
        rounded-xl
        border
        bg-white
      "
    >

      <table
        className="
          w-full
          text-right
      "
      >

        <thead>

          <tr
            className="
              border-b
              bg-gray-50
              text-gray-600
              text-sm
            "
          >

            <th className="p-4">
              المستخدم
            </th>


            <th className="p-4">
              الدور السابق
            </th>


            <th className="p-4">
              الدور الجديد
            </th>


            <th className="p-4">
              تم بواسطة
            </th>


            <th className="p-4">
              التاريخ
            </th>


          </tr>

        </thead>


        <tbody>


          {
            history.map(
              item => (

                <tr

                  key={
                    item.id
                  }

                  className="
                    border-b
                    hover:bg-gray-50
                  "

                >

                  <td
                    className="
                      p-4
                      font-medium
                    "
                  >

                    {
                      item.user?.full_name
                      ??
                      "مستخدم غير معروف"
                    }

                  </td>



                  <td
                    className="
                      p-4
                    "
                  >

                    {
                      roleLabel(
                        item.old_role
                      )
                    }

                  </td>



                  <td
                    className="
                      p-4
                    "
                  >

                    {
                      roleLabel(
                        item.new_role
                      )
                    }

                  </td>



                  <td
                    className="
                      p-4
                    "
                  >

                    {
                      item.changer?.full_name
                      ??
                      "غير معروف"
                    }

                  </td>



                  <td
                    className="
                      p-4
                      text-sm
                      text-gray-500
                    "
                  >

                    {
                      new Date(
                        item.created_at
                      )
                      .toLocaleString()
                    }

                  </td>


                </tr>

              )
            )
          }


        </tbody>


      </table>


    </div>

  );

}