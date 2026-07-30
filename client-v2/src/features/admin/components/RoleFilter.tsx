import type {
  UserRoleFilter,
} from "../types/admin";

interface Props {
  value: UserRoleFilter;
  onChange: (
    value: UserRoleFilter
  ) => void;
}

const roles = [
  {
    value: "all",
    label: "جميع الأدوار",
  },
  {
    value: "student",
    label: "🎓 Student",
  },
  {
    value: "elite_student",
    label: "⭐ Elite Student",
  },
  {
    value: "professor",
    label: "👨‍🏫 Professor",
  },
  {
    value: "admin",
    label: "👑 Admin",
  },
] as const;

export default function RoleFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target
            .value as UserRoleFilter
        )
      }
      className="
        rounded-xl
        border
        bg-white
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      {roles.map((role) => (
        <option
          key={role.value}
          value={role.value}
        >
          {role.label}
        </option>
      ))}
    </select>
  );
}