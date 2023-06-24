import * as yup from 'yup';

export const noteSchema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string()
})
