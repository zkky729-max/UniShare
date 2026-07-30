import {
  useEffect,
  useState,
} from "react";


import {
  useUpdateUserRole,
} from "../hooks/useUpdateUserRole";


import type {
  AdminUser,
  UserRole,
} from "../types/admin";



interface Props {

  open: boolean;

  user: AdminUser | null;

  onClose: () => void;

  onSuccess: () => void;

}



const roles: UserRole[] = [

  "student",

  "elite_student",

  "professor",

  "admin",

];



export default function ChangeRoleDialog({

  open,

  user,

  onClose,

  onSuccess,

}: Props) {



  const [
    role,
    setRole,
  ] = useState<UserRole>("student");



  const {
    updateRole,
    loading,
  } = useUpdateUserRole();




  useEffect(() => {

    if (user) {

      setRole(
        user.role
      );

    }

  }, [user]);





  if (!open || !user) {

    return null;

  }



  const selectedUser = user;





  async function handleSubmit() {


    try {


      await updateRole(

        selectedUser.user_id,

        role

      );


      onSuccess();


    } catch (error) {


      console.error(
        "Failed to update role:",
        error
      );


    }

  }





  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
      "
    >


      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >



        <h2
          className="
            mb-5
            text-xl
            font-bold
          "
        >
          تغيير دور المستخدم
        </h2>





        <div className="mb-5">


          <p className="font-medium">

            {
              selectedUser.full_name
              ??
              "بدون اسم"
            }

          </p>



          <p
            className="
              text-sm
              text-gray-500
            "
          >

            {
              selectedUser.email
              ??
              "-"
            }

          </p>


        </div>





        <label
          className="
            mb-2
            block
            text-sm
            text-gray-600
          "
        >
          الدور الجديد
        </label>





        <select

          value={role}

          onChange={(e) =>
            setRole(
              e.target.value as UserRole
            )
          }

          className="
            mb-6
            w-full
            rounded-lg
            border
            p-2
          "

        >

          {
            roles.map((item) => (

              <option

                key={item}

                value={item}

              >

                {item}

              </option>

            ))
          }


        </select>







        <div
          className="
            flex
            justify-end
            gap-3
          "
        >



          <button

            onClick={onClose}

            className="
              rounded-lg
              px-4
              py-2
              text-gray-600
              hover:bg-gray-100
            "

          >
            إلغاء
          </button>





          <button

            onClick={handleSubmit}

            disabled={loading}

            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
              disabled:opacity-50
            "

          >

            {
              loading
              ?
              "جاري الحفظ..."
              :
              "حفظ"
            }

          </button>




        </div>




      </div>


    </div>

  );

}