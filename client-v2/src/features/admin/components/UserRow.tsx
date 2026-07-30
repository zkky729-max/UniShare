import type {
  AdminUser,
} from "../types/admin";


import UserRoleBadge from "./UserRoleBadge";



interface Props {

  user: AdminUser;

  onChangeRole: (
    user: AdminUser
  ) => void;

}



export default function UserRow({

  user,

  onChangeRole,

}: Props) {


  return (

    <tr
      className="
        border-b
        hover:bg-gray-50
      "
    >


      <td className="px-4 py-3">

        <div>

          <p className="font-medium">

            {
              user.full_name
              ??
              "بدون اسم"
            }

          </p>


          <p className="
            text-sm
            text-gray-500
          ">

            {
              user.email
              ??
              "-"
            }

          </p>


        </div>


      </td>




      <td className="px-4 py-3">

        <UserRoleBadge

          role={
            user.role
          }

        />

      </td>




      <td className="px-4 py-3">

        {
          user.faculty?.name
          ??
          "-"
        }

      </td>




      <td className="px-4 py-3">

        {
          user.specialty?.name
          ??
          "-"
        }

      </td>




      <td className="px-4 py-3">


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
            hover:bg-blue-700
          "

        >

          تغيير الدور

        </button>


      </td>


    </tr>

  );

}