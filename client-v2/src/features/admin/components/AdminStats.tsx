import type { AdminStats as StatsType } from "../api/getAdminStats";


interface Props {

  stats: StatsType;

}



export default function AdminStats({
  stats,
}: Props) {


  const cards = [

    {
      title: "Users",
      value: stats.totalUsers,
      icon: "👥",
    },


    {
      title: "Students",
      value: stats.students,
      icon: "🎓",
    },


    {
      title: "Elite Students",
      value: stats.eliteStudents,
      icon: "⭐",
    },


    {
      title: "Professors",
      value: stats.professors,
      icon: "👨‍🏫",
    },


    {
      title: "Admins",
      value: stats.admins,
      icon: "👑",
    },

  ];



  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5
        gap-5
      "
    >

      {
        cards.map(
          card => (

            <div

              key={card.title}

              className="
                bg-white
                rounded-2xl
                border
                p-5
                shadow-sm
              "

            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-3xl
                  "
                >

                  {card.icon}

                </span>


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
                  text-3xl
                  font-bold
                  mt-1
                "
              >

                {card.value}

              </p>


            </div>

          )
        )
      }


    </div>

  );

}