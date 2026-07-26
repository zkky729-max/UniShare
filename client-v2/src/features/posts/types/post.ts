export interface Post {

  id: string;


  author: {

    id: string;

    name: string;

    avatar?: string;

    role?: string;

  };


  content: string;


  image?: string;

  pdf?: string;


  likes: number;

  comments: number;

  shares: number;


  createdAt: string;

}