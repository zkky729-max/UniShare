import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getUniversityBySlug,
} from "../api/universitiesApi";

import type {
  University,
} from "../types/university";


export function useUniversity(
  slug?: string
) {
  const [
    university,
    setUniversity,
  ] = useState<University | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);


  const loadUniversity =
    useCallback(async () => {

      if (!slug) {
        setUniversity(null);
        setLoading(false);
        setError("معرّف الجامعة غير موجود");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await getUniversityBySlug(slug);

        setUniversity(data);

      } catch (err) {

        console.error(
          "Failed to load university:",
          err
        );

        setUniversity(null);

        setError(
          err instanceof Error
            ? err.message
            : "تعذر تحميل الجامعة"
        );

      } finally {
        setLoading(false);
      }

    }, [slug]);


  useEffect(() => {
    loadUniversity();
  }, [loadUniversity]);


  return {
    university,
    loading,
    error,
    refresh: loadUniversity,
  };
}