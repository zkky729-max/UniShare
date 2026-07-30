import { useEffect } from "react";

import { supabase } from "../../../lib/supabaseClient";


export function useCommentsRealtime(
  postId: string,
  onChange: () => void
) {

  useEffect(() => {

    if (!postId) return;


    const channel =
      supabase
        .channel(
          `comments-${postId}`
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "comments",
            filter: `post_id=eq.${postId}`,
          },

          () => {

            onChange();

          }

        )

        .subscribe();



    return () => {

      supabase.removeChannel(
        channel
      );

    };


  },[
    postId,
    onChange
  ]);

}