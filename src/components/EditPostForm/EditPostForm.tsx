import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editPost } from "../../services/postService";
import type { UpdatePost } from "../../types/post";
import css from "./EditPostForm.module.css";

interface EditPostFormProps {
  initialValues: { id: number; title: string; body: string };
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

export default function EditPostForm({ initialValues, onClose }: EditPostFormProps) {

  const queryClient = useQueryClient();

  const fieldId = useId(); 
  
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UpdatePost) => editPost(initialValues.id, values),
    onSuccess() {
      alert("Post edited successfully!");
      console.log("Post edited!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError() {
      alert("Error editing post!");
    },
  });

  const handleSubmit = (
    values: { title: string; body: string },
    actions: FormikHelpers<{ title: string; body: string }>
  ) => {
    mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={{
        title: initialValues.title,
        body: initialValues.body,
      }}
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
            {isPending ? "Saving..." : "Edit post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
