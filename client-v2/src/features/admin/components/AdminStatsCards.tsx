import type { AdminUser } from "../types/admin";

interface Props {
  users: AdminUser[];
}

export default function AdminStatsCards({
  users,
}: Props) {

  const total =
    users.length;

  const students =
    users.filter(
      u => u.role === "student"
    ).length;

  const elite =
    users.filter(
      u => u.role === "elite_student"
    ).length;

  const professors =
    users.filter(
      u => u.role === "professor"
    ).length;

  const admins =
    users.filter(
      u => u.role === "admin"
    ).length;

  const cards = [

    {
      title: "إجمالي المستخدمين",
      value: total,
      icon: "👥",
    },

    {
      title: "الطلاب",
      value: students,
      icon: "🎓",
    },

    {
      title: "Elite",
      value: elite,
      icon: "⭐",
    },

    {
      title: "الأساتذة",
      value: professors,
      icon: "👨‍🏫",
    },

    {
      title: "المدراء",
      value: admins,
      icon: "👑",
    },

  ];

  return (

    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-5
      "
    >

      {cards.map(card => (

        <div

          key={card.title}

          className="
            rounded-2xl
            border
            bg-white
            p-5
            shadow-sm
          "

        >

          <div className="text-3xl">

            {card.icon}

          </div>

          <h3
            className="
              mt-4
              text-gray-500
              text-sm
            "
          >

            {card.title}

          </h3>

          <p
            className="
              mt-2
              text-3xl
              font-bold
            "
          >

            {card.value}

          </p>

        </div>

      ))}

    </div>

  );

}