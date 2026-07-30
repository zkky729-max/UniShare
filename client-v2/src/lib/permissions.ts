import type { UserRole } from "../types/roles";

export type Permission =
  | "upload_file"
  | "download_file"
  | "comment"
  | "rate"
  | "review_file"
  | "approve_file"
  | "reject_file"
  | "edit_file"
  | "create_course"
  | "create_exam"
  | "approve_important_file"
  | "manage_users";

export const permissions: Record<UserRole, Permission[]> = {
  student: [
    "upload_file",
    "download_file",
    "comment",
    "rate",
  ],

  elite_student: [
    "upload_file",
    "download_file",
    "comment",
    "rate",
    "review_file",
    "approve_file",
    "reject_file",
    "edit_file",
  ],

  professor: [
    "upload_file",
    "download_file",
    "comment",
    "rate",
    "create_course",
    "create_exam",
    "approve_important_file",
  ],

  admin: [
    "upload_file",
    "download_file",
    "comment",
    "rate",
    "review_file",
    "approve_file",
    "reject_file",
    "edit_file",
    "create_course",
    "create_exam",
    "approve_important_file",
    "manage_users",
  ],
};