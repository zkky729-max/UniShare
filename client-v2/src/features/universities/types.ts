export interface University {
  id: string;
  country_id: string;
  name: string;
  short_name: string | null;
  city: string | null;
  logo_url: string | null;
  created_at?: string;
}