import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAdminStats,
  type AdminStats,
} from "../api/getAdminStats";



export function useAdminStats() {


  const [
    stats,
    setStats,
  ] = useState<AdminStats | null>(null);



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
            await getAdminStats();



          setStats(data);


        }

        catch(error:any){

          console.error(
            "ADMIN STATS ERROR:",
            error
          );


          setError(
            error?.message ??
            "فشل تحميل الإحصائيات"
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

    stats,

    loading,

    error,

    refresh,

  };

}