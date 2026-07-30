import { permissions } from "./permissions";
import type { Permission } from "./permissions";
import type { UserRole } from "../types/roles";

export function can(
  role: UserRole,
  permission: Permission
): boolean {
  return permissions[role].includes(permission);
}