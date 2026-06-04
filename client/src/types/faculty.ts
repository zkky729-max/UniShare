export interface Faculty {
  id: string;
  name: string;
}

export interface Specialty {
  id: string;
  faculty_id: string;
  name: string;
}