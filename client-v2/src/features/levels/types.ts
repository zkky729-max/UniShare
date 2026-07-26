export interface Level {
  id: string;
  name: string;
  description: string | null;
  specialty_id: string;
  education_type_id?: string | null;
  year_id?: string | null;
  created_at?: string;
}


export interface CreateLevel {
  name: string;
  description?: string | null;
  specialty_id: string;
  education_type_id?: string | null;
  year_id?: string | null;
}