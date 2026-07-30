import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getRoleHistory,
  type RoleHistoryItem,
} from "../api/getRoleHistory";


export function useRoleHistory() {


  const [
    history,
    setHistory,
  ] = useState<RoleHistoryItem[]>([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    error,
    setError,
  ] = useState<string | null>(null);





  const refresh =
    useCallback(
      async () => {

        try {

          setLoading(true);

          setError(null);


          const data =
            await getRoleHistory();


          setHistory(data);


        }

        catch(error:any){

          console.error(
            error
          );


          setError(
            error?.message ??
            "فشل تحميل سجل الأدوار"
          );

        }

        finally {

          setLoading(false);

        }

      },
      []
    );





  useEffect(() => {

    refresh();

  }, [refresh]);





  return {

    history,

    loading,

    error,

    refresh,

  };

}