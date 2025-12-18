import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is a required field."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot be longer than 50 characters")
    .required("Password is a required field"),
});
const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is a required field."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot be longer than 50 characters")
    .required("Password is a required field"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
export { LoginSchema, signupSchema };
