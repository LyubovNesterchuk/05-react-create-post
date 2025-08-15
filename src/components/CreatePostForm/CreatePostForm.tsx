import { useId } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../../services/postService";
import type { NewPost } from "../../types/post";
import css from "./CreatePostForm.module.css";

interface CreatePostFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  body: Yup.string()
    .required("Content is required")
    .max(500, "Content must be at most 500 characters"),
});

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: NewPost) => createPost(values),
    onSuccess() {
      alert("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError() {
      alert("Error creating post!");
    },
  });

  const handleSubmit = (
    values: NewPost,
    actions: FormikHelpers<NewPost>
  ) => {
    mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-body`}>Content</label>
          <Field
            id={`${fieldId}-body`}
            as="textarea"
            name="body"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}