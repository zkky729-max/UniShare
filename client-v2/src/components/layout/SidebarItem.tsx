import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type Props = {
  to: string;
  icon: LucideIcon;
  label: string;
};

export default function SidebarItem({ to, icon: Icon, label }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
}