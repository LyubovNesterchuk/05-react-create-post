export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// export type NewPost = Omit<Post, "id" | "userId">;
export interface NewPost {
  title: string;
  body: string;
}

//  export type UpdatePost = Partial<Omit<Post, "userId">>; // можна оновлювати title/body
export interface UpdatePost {
  title?: string;
  body?: string;
}

export type PostId = Post["id"];