import * as yup from 'yup';

export const authSignUpSchema = yup.object({
  email: yup.string().email("Please provide a valid email").required("Email is required"),
  password: yup.string().min(8, "Password should be min 8 characters long").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], "Passwords must match"),
  fullName: yup.string().required("Full Name is required")
})

export const authSignInSchema = yup.object({
  email: yup.string().email("Please provide a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

export const oAuthSchema = yup.object({
  email: yup.string().email("Please provide a valid email").required("Email is required"),
  fullName: yup.string().required("Full Name is required"),
  avatar: yup.string().required()
})