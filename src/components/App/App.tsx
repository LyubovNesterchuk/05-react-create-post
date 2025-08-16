// import { useState } from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { useDebouncedCallback } from "use-debounce";

// import Modal from "../Modal/Modal";
// import PostList from "../PostList/PostList";
// import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
// import CreatePostForm from "../CreatePostForm/CreatePostForm";
// import EditPostForm from "../EditPostForm/EditPostForm";

// import { fetchPosts } from "../../services/postService";
// import type { Post } from "../../types/post";
// import css from "./App.module.css";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreatePost, setIsCreatePost] = useState(false);
//   const [isEditPost, setIsEditPost] = useState(false);
//   const [editedPost, setEditedPost] = useState<Post | null>(null);

 
//   const debounced = useDebouncedCallback((value: string) => {
//     setDebouncedSearchQuery(value);
//     setCurrentPage(1);
//   }, 300);

//   const handleSearch = (value: string) => {
//     setSearchQuery(value);
//     debounced(value);
//   };

//   const openCreateModal = () => {
//     setIsCreatePost(true);
//     setIsEditPost(false);
//     setEditedPost(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = () => {
//     setIsEditPost(true);
//     setIsCreatePost(false);
//     setIsModalOpen(true);
//   };

//   const selectPostForEdit = (post: Post) => {
//     setEditedPost(post);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setIsCreatePost(false);
//     setIsEditPost(false);
//     setEditedPost(null);
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: ["posts", debouncedSearchQuery, currentPage],
//     queryFn: () =>
//       fetchPosts({
//         searchText: debouncedSearchQuery,
//         page: currentPage,
//         limit: 10,
//       }),
//     placeholderData: keepPreviousData,
//   });

//   if (isLoading) {
//     return <div className={css.loader}>Loading...</div>;
//   }

//   const posts = data || [];

//   const totalPages = posts.length > 0 ? 10 : 0;

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={searchQuery} onChange={handleSearch} />
//         {totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <button className={css.button} onClick={openCreateModal}>
//           Create post
//         </button>
//       </header>

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         {isCreatePost && <CreatePostForm onClose={closeModal} />}
//         {isEditPost && editedPost && (
//           <EditPostForm initialValues={editedPost} onClose={closeModal} />
//         )}
//       </Modal>

//       <PostList
//         posts={posts}
//         toggleModal={openEditModal}
//         toggleEditPost={selectPostForEdit}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";

import { fetchPosts } from "../../services/postService";
import type { Post } from "../../types/post";

import css from "./App.module.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const debouncedSearchQuery = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    300
  );

  const openCreateModal = (): void => {
    setIsCreatePost(true);
    setIsEditPost(false);
    setEditedPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (): void => {
    setIsEditPost(true);
    setIsCreatePost(false);
    setIsModalOpen(true);
  };

  const selectPostForEdit = (post: Post): void => {
    setEditedPost(post);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setIsCreatePost(false);
    setIsEditPost(false);
    setEditedPost(null);
  };

  const { data = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () =>
      fetchPosts({ searchText: searchQuery, page: currentPage, limit: 10 }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div className={css.loader}>Loading...</div>;
  }

  const totalPages = data.length > 0 ? 10 : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onChange={debouncedSearchQuery}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openCreateModal}>
          Create post
        </button>
      </header>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isCreatePost && <CreatePostForm onClose={closeModal} />}
        {isEditPost && editedPost && (
          <EditPostForm initialValues={editedPost} onClose={closeModal} />
        )}
      </Modal>

      <PostList
        posts={data}
        toggleModal={openEditModal}
        toggleEditPost={selectPostForEdit}
      />
    </div>
  );
}