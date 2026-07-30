import { useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";


export function usePostsRealtime(
  refresh: () => Promise<void>
) {


  useEffect(() => {


    const channelName =
      "feed-realtime";



    const existingChannel =
      supabase
        .getChannels()
        .find(
          channel =>
            channel.topic ===
            `realtime:${channelName}`
        );



    if (existingChannel) {

      supabase.removeChannel(
        existingChannel
      );

    }





    const channel =
      supabase
        .channel(channelName)

        .on(

          "postgres_changes",

          {
            event: "*",
            schema: "public",
            table: "posts",
          },


          () => {

            void refresh();

          }

        )

        .subscribe();





    return () => {


      supabase.removeChannel(
        channel
      );


    };



  }, [refresh]);


}