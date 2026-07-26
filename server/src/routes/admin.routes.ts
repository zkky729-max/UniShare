import express from "express";
import {
  createFaculty,
  getFaculties,
  createSpecialty,
  getSpecialties,
  getSpecialtiesByFaculty,
  createSubject,
  getSubjects,
} from "../controllers/admin.controller";

const router = express.Router();

/* =======================
   📚 FACULTIES
======================= */

// إضافة كلية
router.post("/faculties", createFaculty);

// جلب كل الكليات
router.get("/faculties", getFaculties);

/* =======================
   🏛 SPECIALTIES
======================= */

// إضافة تخصص
router.post("/specialties", createSpecialty);

// جلب كل التخصصات
router.get("/specialties", getSpecialties);

// جلب التخصصات حسب الكلية (Dropdown مهم)
router.get("/specialties/faculty/:faculty_id", getSpecialtiesByFaculty);

/* =======================
   📖 SUBJECTS
======================= */

// إضافة مادة
router.post("/subjects", createSubject);

// جلب كل المواد
router.get("/subjects", getSubjects);

export default router;