import {
  useState,
} from "react";


import {
  useUsers,
} from "../hooks/useUsers";


import type {
  AdminUser,
} from "../types/admin";


import UsersTable from "../components/UsersTable";
import UserSearchInput from "../components/UserSearchInput";
import RoleFilter from "../components/RoleFilter";
import UserSort from "../components/UserSort";
import AdminStatsCards from "../components/AdminStatsCards";
import ChangeRoleDialog from "../components/ChangeRoleDialog";



export default function UsersManagementPage() {


  const {
    users,
    loading,
    error,
    refresh,
    search,
    setSearch,
    role,
    setRole,
    sort,
    setSort,
  } = useUsers();



  const [
    selectedUser,
    setSelectedUser,
  ] = useState<AdminUser | null>(null);



  if (loading) {

    return (
      <div className="p-10">
        جاري تحميل المستخدمين...
      </div>
    );

  }



  if (error) {

    return (
      <div className="p-10 text-red-600">
        {error}
      </div>
    );

  }



  return (

    <div className="space-y-6 p-6">


      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Users Management
          </h1>


          <p className="text-gray-500">
            إدارة المستخدمين
          </p>

        </div>


        <button

          onClick={refresh}

          className="
            rounded-xl
            bg-gray-900
            px-4
            py-2
            text-white
          "

        >
          تحديث
        </button>


      </div>



      <AdminStatsCards
        users={users}
      />



      <div className="
        flex
        flex-col
        gap-4
        md:flex-row
      ">

        <UserSearchInput
          value={search}
          onChange={setSearch}
        />


        <RoleFilter
          value={role}
          onChange={setRole}
        />


        <UserSort
          value={sort}
          onChange={setSort}
        />

      </div>



      <UsersTable

        users={users}

        onChangeRole={
          setSelectedUser
        }

      />




      <ChangeRoleDialog

        open={
          !!selectedUser
        }

        user={
          selectedUser
        }

        onClose={() =>
          setSelectedUser(null)
        }

        onSuccess={() => {

          refresh();

          setSelectedUser(null);

        }}

      />


    </div>

  );

}