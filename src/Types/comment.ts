export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface CommentType {
  image: string;
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}
