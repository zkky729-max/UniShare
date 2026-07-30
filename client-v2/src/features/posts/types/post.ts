export type AudienceType =
  | "public"
  | "faculty"
  | "specialty"
  | "level"
  | "module";



export interface Post {

  id: string;


  author: {
    id: string;
    name: string;
    avatar?: string;
  };


  content: string;


  image?: string;


  images_urls?: string[];


  pdf?: string;



  // Academic Community

  audienceType?: AudienceType;

  facultyId?: string | null;

  specialtyId?: string | null;

  levelId?: string | null;

  moduleId?: string | null;



  likes: number;


  likedByMe: boolean;


  comments: number;


  shares: number;


  createdAt: string;


  isOwner: boolean;

}