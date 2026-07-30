import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";


import { getPosts } from "../api/getPosts";

import {
  createPost as createPostApi,
} from "../api/createPost";


import {
  deletePost as deletePostApi,
} from "../api/deletePost";


import {
  updatePost as updatePostApi,
} from "../api/updatePost";


import {
  toggleLike as toggleLikeApi,
} from "../api/toggleLike";



import {
  usePostsRealtime,
} from "../realtime/usePostsRealtime";


import {
  useLikesRealtime,
} from "../realtime/useLikesRealtime";



import type {
  Post,
  AudienceType,
} from "../types/post";



import type {
  FeedFilter,
} from "../types/feed";



// إعادة تصدير حتى لا تنكسر الملفات القديمة
export type {
  FeedFilter,
} from "../types/feed";








type CreatePostInput = {

  content: string;

  images?: File[];

  pdf?: File | null;

  audienceType: AudienceType;

};






type UpdatePostInput = {

  id: string;

  content: string;

};








type FeedContextType = {

  posts: Post[];

  setPosts:
  React.Dispatch<
    React.SetStateAction<Post[]>
  >;


  loading: boolean;


  error: string | null;


  refresh:
  () => Promise<void>;



  activeFilter: FeedFilter;


  setActiveFilter:
  (
    filter: FeedFilter
  ) => void;



  createPost:
  (
    data: CreatePostInput
  ) => Promise<void>;



  updatePost:
  (
    data: UpdatePostInput
  ) => Promise<void>;



  deletePost:
  (
    id: string
  ) => Promise<void>;



  toggleLike:
  (
    postId:string,
    likedByMe:boolean
  ) => Promise<void>;

};










const FeedContext =
createContext<
  FeedContextType | undefined
>(undefined);









export function FeedProvider({
  children,
}:{
  children:ReactNode;
}) {



  const [posts,setPosts] =
  useState<Post[]>([]);



  const [loading,setLoading] =
  useState(true);



  const [error,setError] =
  useState<string|null>(null);



  const [activeFilter,setActiveFilter] =
  useState<FeedFilter>("all");









  const refresh =
  useCallback(

    async()=>{


      try{


        setError(null);



        const data =
        await getPosts(
          activeFilter
        );



        setPosts(data);


      }

      catch(error){


        console.error(error);


        setError(

          error instanceof Error

          ? error.message

          : "Failed loading posts"

        );


      }

      finally{


        setLoading(false);


      }


    },

    [
      activeFilter
    ]

  );









  useEffect(()=>{


    setLoading(true);


    void refresh();


  },[
    refresh
  ]);









  usePostsRealtime(
    refresh
  );


  useLikesRealtime(
    refresh
  );









  async function createPost(
    data:CreatePostInput
  ){


    await createPostApi({

      content:data.content,

      images:data.images,

      pdf:data.pdf,

      audienceType:
      data.audienceType,

    });



    await refresh();


  }









  async function updatePost(
    data:UpdatePostInput
  ){


    await updatePostApi(

      data.id,

      data.content

    );



    setPosts(current=>

      current.map(post=>

        post.id === data.id

        ?

        {
          ...post,
          content:data.content,
        }

        :

        post

      )

    );


  }









  async function deletePost(
    id:string
  ){


    await deletePostApi(
      id
    );



    setPosts(current=>

      current.filter(
        post =>
        post.id !== id
      )

    );


  }









  async function toggleLike(
    postId:string,
    likedByMe:boolean
  ){


    setPosts(current=>

      current.map(post=>{


        if(
          post.id !== postId
        )
          return post;



        return {

          ...post,


          likedByMe:
          !likedByMe,


          likes:

          !likedByMe

          ?

          post.likes + 1

          :

          Math.max(
            0,
            post.likes - 1
          ),


        };


      })

    );





    try{


      await toggleLikeApi(

        postId,

        likedByMe

      );


    }

    catch(error){


      console.error(
        "Like failed",
        error
      );


      await refresh();


    }


  }












  return (

    <FeedContext.Provider


      value={{

        posts,

        setPosts,


        loading,

        error,


        refresh,


        activeFilter,

        setActiveFilter,


        createPost,

        updatePost,

        deletePost,

        toggleLike,

      }}


    >

      {children}

    </FeedContext.Provider>

  );

}









export function useFeed(){


  const context =
  useContext(
    FeedContext
  );



  if(!context){


    throw new Error(
      "useFeed must be used inside FeedProvider"
    );


  }



  return context;


}