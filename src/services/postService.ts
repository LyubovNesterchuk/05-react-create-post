import axios from "axios";
import type { Post, NewPost, UpdatePost } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsParams {
  searchText?: string;
  page?: number;
  limit?: number;
}

// export const fetchPosts = async (searchText, page) => {};
// Отримання списку постів з опційним пошуком і пагінацією
export const fetchPosts = async ({
  searchText = "",
  page = 1,
  limit = 10,
}: FetchPostsParams): Promise<Post[]> => {
  const params: Record<string, string | number> = {
    _page: page,
    _limit: limit,
  };

  if (searchText.trim()) {
    params.q = searchText.trim();
  }

  const { data } = await axios.get<Post[]>("/posts", { params });
  return data;
};


// export const createPost = async (newPost) => {};
export const createPost = async (newPost: NewPost): Promise<Post> => {
  const { data } = await axios.post<Post>("/posts", newPost);
  return data;
};


// export const editPost = async (newDataPost) => {};
export const editPost = async (
  postId: number,
  updatedData: UpdatePost
): Promise<Post> => {
  const { data } = await axios.patch<Post>(`/posts/${postId}`, updatedData);
  return data;
};


// export const deletePost = async (postId) => {};
export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`/posts/${postId}`);
};