export interface Comment {
  id: string;

  postId: string;

  content: string;

  createdAt: string;

  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}