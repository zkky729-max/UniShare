import { supabase } from "../lib/supabase";

/* =======================
   📚 FACULTIES
======================= */

// إنشاء كلية
export const createFaculty = async (req: any, res: any) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("faculties")
    .insert([{ name }])
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

// جلب كل الكليات
export const getFaculties = async (_req: any, res: any) => {
  const { data, error } = await supabase
    .from("faculties")
    .select("*");

  if (error) return res.status(400).json(error);

  res.json(data);
};

/* =======================
   🏛 SPECIALTIES
======================= */

// إنشاء تخصص
export const createSpecialty = async (req: any, res: any) => {
  const { name, faculty_id } = req.body;

  const { data, error } = await supabase
    .from("specialties")
    .insert([{ name, faculty_id }])
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

// جلب كل التخصصات
export const getSpecialties = async (_req: any, res: any) => {
  const { data, error } = await supabase
    .from("specialties")
    .select("*");

  if (error) return res.status(400).json(error);

  res.json(data);
};

// 🟢 جلب التخصصات حسب الكلية (Dropdown مهم)
export const getSpecialtiesByFaculty = async (req: any, res: any) => {
  const { faculty_id } = req.params;

  const { data, error } = await supabase
    .from("specialties")
    .select("*")
    .eq("faculty_id", faculty_id);

  if (error) return res.status(400).json(error);

  res.json(data);
};

/* =======================
   📖 SUBJECTS
======================= */

// إنشاء مادة
export const createSubject = async (req: any, res: any) => {
  const { name, semester, specialty_id } = req.body;

  const { data, error } = await supabase
    .from("subjects")
    .insert([{ name, semester, specialty_id }])
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

// جلب كل المواد
export const getSubjects = async (_req: any, res: any) => {
  const { data, error } = await supabase
    .from("subjects")
    .select("*");

  if (error) return res.status(400).json(error);

  res.json(data);
};