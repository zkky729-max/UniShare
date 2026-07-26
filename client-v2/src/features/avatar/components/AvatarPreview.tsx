interface Props {

  gender:string;

  hair:string;

  clothes:string;

  accessory:string;

}



export default function AvatarPreview({

  gender,

  hair,

  clothes,

  accessory,

}:Props){



  function getAvatar(){

    if(gender==="female"){

      return "👩‍🎓";

    }


    return "👨‍🎓";

  }




  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-50
      to-indigo-100
      rounded-3xl
      p-8
      shadow-inner
    ">


      <div className="
        w-52
        h-52
        rounded-full
        bg-white
        flex
        items-center
        justify-center
        text-8xl
        shadow-lg
      ">


        {getAvatar()}


      </div>



      <div className="
        mt-6
        text-center
        space-y-2
      ">


        <p>
          💇 الشعر:
          <span className="font-bold ml-2">
            {hair}
          </span>
        </p>



        <p>
          👕 الملابس:
          <span className="font-bold ml-2">
            {clothes}
          </span>
        </p>



        <p>
          🎧 الإكسسوار:
          <span className="font-bold ml-2">
            {accessory}
          </span>
        </p>



      </div>



    </div>

  );


}