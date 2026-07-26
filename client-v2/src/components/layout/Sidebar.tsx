import {
  NavLink
} from "react-router-dom";


import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  User,
  BookOpen
} from "lucide-react";



const links = [

{
  name:"الرئيسية",
  path:"/dashboard",
  icon:<LayoutDashboard size={20}/>
},


{
  name:"الجامعات",
  path:"/universities",
  icon:<Building2 size={20}/>
},


{
  name:"الكليات",
  path:"/faculties",
  icon:<GraduationCap size={20}/>
},


{
  name:"الموارد التعليمية",
  path:"/resources",
  icon:<BookOpen size={20}/>
},


{
  name:"الملف الشخصي",
  path:"/profile",
  icon:<User size={20}/>
},


];





export default function Sidebar(){


return (

<aside

className="
w-72
bg-white
border-l
shadow-sm
min-h-screen
"

>


{/* Logo */}

<div

className="
p-6
border-b
"

>

<h1

className="
text-3xl
font-bold
text-blue-600
"

>

UniShare 🎓

</h1>


<p
className="
text-sm
text-gray-500
mt-2
"
>

منصة التعليم الجامعي

</p>


</div>






<nav

className="
p-4
space-y-2
"

>


{
links.map((link)=>(


<NavLink

key={link.path}

to={link.path}

className={({isActive})=>

`

flex
items-center
gap-3
px-4
py-3
rounded-xl
transition

${

isActive

?

"bg-blue-600 text-white shadow"

:

"text-gray-700 hover:bg-gray-100"

}

`

}

>


{link.icon}


<span>

{link.name}

</span>


</NavLink>


))
}



</nav>



</aside>


);


}