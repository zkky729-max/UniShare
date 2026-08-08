export interface University {
  id: string;
  name: string;
  slug: string;
  short_name: string | null;
  country_id: string | null;
  city: string | null;
  logo_url: string | null;
  created_at?: string;
}