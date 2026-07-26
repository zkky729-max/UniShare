interface Item {

id:string;

name:string;

}



interface Props {

title:string;

items:Item[];

selected:string;

onSelect:(id:string)=>void;

icon:string;

}




export default function OptionSelector({

title,

items,

selected,

onSelect,

icon,

}:Props){



return (

<div className="mb-6">


<h3 className="
font-bold
mb-3
">

{icon} {title}

</h3>



<div className="
grid
grid-cols-3
gap-3
">


{

items.map(item=>(


<button

type="button"

key={item.id}

onClick={()=>
onSelect(item.id)
}


className={`

p-3

rounded-xl

border

transition


${
selected===item.id

?

"bg-blue-600 text-white"

:

"bg-white"

}


`}


>


{item.name}


</button>


))

}


</div>


</div>

);


}