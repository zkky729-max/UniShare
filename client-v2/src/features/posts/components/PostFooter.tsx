interface Props {
  likes: number;
  comments: number;
  shares: number;
}


export default function PostFooter({
  likes,
  comments,
  shares,
}: Props) {

  return (

    <div
      className="
      mt-5
      flex
      items-center
      justify-between
      border-t
      pt-4
      text-sm
      text-gray-500
      "
    >

      <div className="flex items-center gap-1">

        ❤️

        <span>
          {likes}
        </span>

        <span>
          Likes
        </span>

      </div>



      <div className="flex items-center gap-1">

        💬

        <span>
          {comments}
        </span>

        <span>
          Comments
        </span>

      </div>




      <div className="flex items-center gap-1">

        ↗️

        <span>
          {shares}
        </span>

        <span>
          Shares
        </span>

      </div>


    </div>

  );

}