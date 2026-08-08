import { supabase } from "../../../lib/supabaseClient";

import type { University } from "../types/university";

/**
 * جلب جميع الجامعات
 */
export async function getUniversities(): Promise<University[]> {
  const { data, error } = await supabase
    .from("universities")
    .select(`
      id,
      name,
      slug,
      short_name,
      country_id,
      city,
      logo_url,
      created_at
    `)
    .order("name", {
      ascending: true,
    });

  if (error) {
    console.error("Failed to fetch universities:", error);
    throw error;
  }

  return (data ?? []) as University[];
}

/**
 * جلب الجامعات حسب الدولة
 */
export async function getUniversitiesByCountry(
  countryId: string
): Promise<University[]> {
  const { data, error } = await supabase
    .from("universities")
    .select(`
      id,
      name,
      slug,
      short_name,
      country_id,
      city,
      logo_url,
      created_at
    `)
    .eq("country_id", countryId)
    .order("name", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Failed to fetch universities by country:",
      error
    );

    throw error;
  }

  return (data ?? []) as University[];
}

/**
 * جلب جامعة بواسطة ID
 */
export async function getUniversityById(
  id: string
): Promise<University> {
  const { data, error } = await supabase
    .from("universities")
    .select(`
      id,
      name,
      slug,
      short_name,
      country_id,
      city,
      logo_url,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      "Failed to fetch university by id:",
      error
    );

    throw error;
  }

  return data as University;
}

/**
 * جلب جامعة بواسطة Slug
 *
 * هذا هو المسار الأساسي للصفحات العامة:
 * /universities/:slug
 */
export async function getUniversityBySlug(
  slug: string
): Promise<University> {
  const { data, error } = await supabase
    .from("universities")
    .select(`
      id,
      name,
      slug,
      short_name,
      country_id,
      city,
      logo_url,
      created_at
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(
      "Failed to fetch university by slug:",
      error
    );

    throw error;
  }

  return data as University;
}