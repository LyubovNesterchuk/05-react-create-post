import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../../services/postService";
import type { Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({
  posts,
  toggleModal,
  toggleEditPost,
}: PostListProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess(post) {
      alert("Post deleted!"); 
      console.log("Post deleted!", post);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError() {
      alert("Error deleting post!");
      console.log("Error deleting post!");
    },
  });

  if (!posts || posts.length === 0) {
    return <p className={css.emptyMessage}>No posts found</p>;
  }

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              className={css.edit}
              onClick={() => {
                toggleEditPost(post);
                toggleModal();
              }}
            >
              Edit
            </button>
            <button
              className={css.delete}
              onClick={() => deleteMutation(post.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

