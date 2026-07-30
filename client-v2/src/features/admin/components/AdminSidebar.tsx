import { NavLink } from "react-router-dom";


const items = [

  {
    label: "Dashboard",
    path: "/admin",
  },

  {
    label: "Users",
    path: "/admin/users",
  },

  {
    label: "Role History",
    path: "/admin/role-history",
  },

  {
    label: "Faculties",
    path: "/admin/faculties",
  },

  {
    label: "Specialties",
    path: "/admin/specialties",
  },

  {
    label: "Levels",
    path: "/admin/levels",
  },

  {
    label: "Semesters",
    path: "/admin/semesters",
  },

  {
    label: "Modules",
    path: "/admin/modules",
  },

  {
    label: "Subjects",
    path: "/admin/subjects",
  },

  {
    label: "Courses",
    path: "/admin/courses",
  },

  {
    label: "Reviews",
    path: "/admin/reviews",
  },

  {
    label: "Reports",
    path: "/admin/reports",
  },

  {
    label: "Settings",
    path: "/admin/settings",
  },

];



export default function AdminSidebar() {

  return (

    <aside
      className="
        w-64
        min-h-screen
        bg-white
        border-r
        p-4
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-6
        "
      >
        UniShare Admin
      </h2>


      <nav
        className="
          space-y-2
        "
      >

        {
          items.map(
            item => (

              <NavLink

                key={item.path}

                to={item.path}

                className={({isActive}) =>
                  `
                  block
                  p-3
                  rounded-lg
                  ${
                    isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                  }
                  `
                }

              >

                {item.label}

              </NavLink>

            )
          )
        }

      </nav>


    </aside>

  );

}