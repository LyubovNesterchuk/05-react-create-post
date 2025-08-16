import axios from "axios";
import type { NewPost, Post, UpdatePost } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsParams {
  searchText?: string;
  page?: number;
  limit?: number;
}

export type FetchPostsResponse = Post[];

export const fetchPosts = async ({
  searchText = "",
  page = 1,
  limit = 10,
}: FetchPostsParams): Promise<FetchPostsResponse> => {
  const response = await axios.get<FetchPostsResponse>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

export const editPost = async (
  postId: number,
  newDataPost: UpdatePost
): Promise<Post> => {
  const response = await axios.patch<Post>(`/posts/${postId}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  const response = await axios.delete(`/posts/${postId}`);
  return response.data;
};



