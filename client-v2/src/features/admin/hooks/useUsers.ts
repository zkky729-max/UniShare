import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  getUsers,
} from "../api/getUsers";


import type {
  AdminUser,
  UserRoleFilter,
  UserSort,
} from "../types/admin";



export function useUsers() {


  const [
    users,
    setUsers,
  ] = useState<AdminUser[]>([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    error,
    setError,
  ] = useState<string | null>(null);



  const [
    search,
    setSearch,
  ] = useState("");



  const [
    role,
    setRole,
  ] = useState<UserRoleFilter>("all");



  const [
    sort,
    setSort,
  ] = useState<UserSort>("newest");





  const refresh =
    useCallback(
      async () => {


        try {


          setLoading(true);

          setError(null);



          const data =
            await getUsers();



          setUsers(data);



        } catch (err: any) {


          console.error(
            "GET USERS ERROR:",
            err
          );



          setError(
            err?.message ??
            "فشل تحميل المستخدمين"
          );



        } finally {


          setLoading(false);


        }


      },
      []
    );





  useEffect(() => {

    refresh();

  }, [refresh]);







  const filteredUsers =
    useMemo(
      () => {


        const keyword =
          search
            .trim()
            .toLowerCase();



        return users.filter(
          (user) => {


            const roleMatch =
              role === "all"
                ? true
                : user.role === role;



            const searchMatch =
              keyword === ""

                ? true

                :

                (
                  user.full_name
                    ?.toLowerCase()
                    .includes(keyword)

                  ||

                  user.username
                    ?.toLowerCase()
                    .includes(keyword)

                  ||

                  user.faculty?.name
                    ?.toLowerCase()
                    .includes(keyword)

                  ||

                  user.specialty?.name
                    ?.toLowerCase()
                    .includes(keyword)
                );



            return (
              roleMatch &&
              searchMatch
            );


          }
        );


      },
      [
        users,
        search,
        role,
      ]
    );









  const sortedUsers =
    useMemo(
      () => {


        const result =
          [
            ...filteredUsers,
          ];



        switch(sort){


          case "name":

            return result.sort(
              (a,b) =>

                (
                  a.full_name ?? ""
                )
                .localeCompare(
                  b.full_name ?? ""
                )
            );




          case "oldest":

            return result.sort(
              (a,b) =>

                new Date(
                  a.created_at
                )
                .getTime()

                -

                new Date(
                  b.created_at
                )
                .getTime()
            );




          case "role":

            return result.sort(
              (a,b) =>

                a.role.localeCompare(
                  b.role
                )
            );




          case "newest":

          default:

            return result.sort(
              (a,b) =>

                new Date(
                  b.created_at
                )
                .getTime()

                -

                new Date(
                  a.created_at
                )
                .getTime()
            );


        }


      },
      [
        filteredUsers,
        sort,
      ]
    );







  return {


    users:
      sortedUsers,



    loading,



    error,



    refresh,



    search,



    setSearch,



    role,



    setRole,



    sort,



    setSort,



    totalUsers:
      users.length,



    filteredCount:
      sortedUsers.length,


  };


}