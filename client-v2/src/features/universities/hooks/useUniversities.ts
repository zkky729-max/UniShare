import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getUniversities,
} from "../api/universitiesApi";

import type {
  University,
} from "../types/university";



export function useUniversities() {
  const [
    universities,
    setUniversities,
  ] = useState<University[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);



  const loadUniversities =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getUniversities();

        setUniversities(data);
      } catch (err) {
        console.error(
          "Failed to load universities:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "حدث خطأ أثناء تحميل الجامعات"
        );
      } finally {
        setLoading(false);
      }
    }, []);



  useEffect(() => {
    loadUniversities();
  }, [loadUniversities]);



  return {
    universities,
    loading,
    error,
    refresh: loadUniversities,
  };
}