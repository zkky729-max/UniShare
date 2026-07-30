import type {
  UserRole,
} from "../types/admin";



interface Props {

  role: UserRole;

}



const roles: Record<
  UserRole,
  {
    label: string;
    style: string;
  }
> = {


  student: {

    label: "🎓 Student",

    style:
      "bg-blue-100 text-blue-700",

  },


  elite_student: {

    label: "⭐ Elite Student",

    style:
      "bg-yellow-100 text-yellow-700",

  },


  professor: {

    label: "👨‍🏫 Professor",

    style:
      "bg-green-100 text-green-700",

  },


  admin: {

    label: "👑 Admin",

    style:
      "bg-red-100 text-red-700",

  },


};



export default function UserRoleBadge({

  role,

}: Props) {



  const current =
    roles[role];



  return (

    <span

      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${current.style}
      `}

    >

      {current.label}

    </span>

  );

}