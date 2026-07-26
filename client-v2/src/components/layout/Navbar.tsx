import {
 Search,
 Bell
} from "lucide-react";


export default function Navbar(){


return (

<header

className="
bg-white
border-b
px-6
py-4
flex
items-center
justify-between
"

>



{/* Search */}

<div

className="
relative
w-96
"

>


<Search

className="
absolute
right-3
top-3
text-gray-400
"

/>


<input

placeholder="ابحث في المنصة..."

className="
w-full
pr-10
py-2
rounded-xl
border
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>







<div

className="
flex
items-center
gap-5
"

>


<Bell
className="
text-gray-500
"
/>



<div
className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-xl
font-semibold
"
>

طالب

</div>



</div>





</header>

);


}