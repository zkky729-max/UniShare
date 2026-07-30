import {
  useState,
} from "react";


import {
  updateUserRole,
} from "../api/updateUserRole";


import type {
  UserRole,
} from "../types/admin";



export function useUpdateUserRole() {


  const [
    loading,
    setLoading,
  ] = useState(false);



  const [
    error,
    setError,
  ] = useState<Error | null>(null);



  async function updateRole(
    userId: string,
    newRole: UserRole
  ) {


    try {

      setLoading(true);

      setError(null);


      await updateUserRole({
        userId,
        newRole,
      });


    } catch (err) {


      const error =
        err instanceof Error
          ? err
          : new Error(
              "Unknown error"
            );


      setError(error);

      throw error;


    } finally {


      setLoading(false);


    }

  }



  return {
    updateRole,
    loading,
    error,
  };

}