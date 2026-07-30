import type {
  AdminUser,
} from "../types/admin";


import UserRoleBadge from "./UserRoleBadge";



interface Props {

  users: AdminUser[];

  onChangeRole: (
    user: AdminUser
  ) => void;

}



export default function UsersTable({

  users,

  onChangeRole,

}: Props) {


  return (

    <div className="
      overflow-x-auto
      rounded-2xl
      border
      bg-white
    ">


      <table className="w-full text-right">


        <tbody>


          {
            users.map((user) => (

              <tr

                key={user.user_id}

                className="
                  border-b
                  hover:bg-gray-50
                "

              >


                <td className="p-4">

                  {user.full_name ?? "بدون اسم"}

                </td>



                <td className="p-4">

                  <UserRoleBadge
                    role={user.role}
                  />

                </td>



                <td className="p-4">

                  {user.faculty?.name ?? "-"}

                </td>



                <td className="p-4">

                  {user.specialty?.name ?? "-"}

                </td>



                <td className="p-4">


                  <button

                    onClick={() =>
                      onChangeRole(user)
                    }

                    className="
                      rounded-lg
                      bg-blue-600
                      px-3
                      py-2
                      text-sm
                      text-white
                    "

                  >
                    تغيير الدور
                  </button>


                </td>


              </tr>

            ))
          }


        </tbody>


      </table>


    </div>

  );

}