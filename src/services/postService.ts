import axios from "axios";
import type { NewPost, Post, PostId, UpdatePost } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsParams {
  searchText?: string;
  page?: number;
  limit?: number;
}

export const fetchPosts = async ({
  searchText = "",
  page = 1,
  limit = 8,
}: FetchPostsParams): Promise<Post[]> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: limit,
    },
  });

  console.log("response", response);
  console.log(response.data);
  
  return response.data;
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (
  postId: PostId,
  updatePost: UpdatePost
): Promise<Post> => {
  const response = await axios.patch<Post>(`/posts/${postId}`,  updatePost);
  return response.data;
};

export const deletePost = async (postId: PostId): Promise<Post> => {
  console.log(postId);
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};



