import { avatars } from "../data/avatars";


interface Props {

selected:string;

onSelect:(image:string)=>void;

}



export default function AvatarSelector({

selected,

onSelect,

}:Props){



return (

<div
className="
grid
grid-cols-3
gap-4
"
>


{
avatars.map((avatar)=>(


<button

key={avatar.id}

type="button"

onClick={()=>onSelect(avatar.image)}

className={`
p-2
rounded-xl
border-4
transition

${
selected===avatar.image
?
"border-blue-600"
:
"border-transparent"
}

`}

>


<img

src={avatar.image}

className="
w-20
h-20
rounded-full
"

/>


</button>


))

}


</div>

);


}