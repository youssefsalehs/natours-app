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
const changeSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required("Current password is required"),
  passwordNew: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot be longer than 50 characters")
    .required("New password is required."),
  passwordNewConfirm: Yup.string()
    .oneOf([Yup.ref("passwordNew"), null], "Passwords must match")
    .required("Please confirm your password"),
});
const editSchema = Yup.object().shape({
  email: Yup.string().email().required("required"),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is Required"),
  photo: Yup.mixed().nullable(),
});
const validationSchema = Yup.object({
  name: Yup.string()
    .min(10, "Min 10 characters")
    .max(40, "Max 40 characters")
    .required("Tour name is required"),
  duration: Yup.number().required("Duration is required"),
  maxGroupSize: Yup.number().required("Group size is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "difficult"])
    .required("Difficulty is required"),
  price: Yup.number().required("Price is required"),
  priceDiscount: Yup.number().test(
    "is-less",
    "Discount must be less than price",
    function (val) {
      if (!val) return true;
      return val < this.parent.price;
    }
  ),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string(),
  imageCover: Yup.mixed().required("Image cover is required"),
  images: Yup.mixed()
    .test("limit", "Upload exactly 3 images", (value) => value?.length === 3)
    .required(),
});
const editTourValidationSchema = Yup.object().shape({
  name: Yup.string().required("Tour name is required"),
  duration: Yup.number().required("Duration is required"),
  maxGroupSize: Yup.number().required("Max group size is required"),
  difficulty: Yup.string().required("Difficulty is required"),
  price: Yup.number().required("Price is required"),
  priceDiscount: Yup.number(),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string(),
  imageCover: Yup.mixed().nullable(),
  images: Yup.array().nullable(),
});
const addTourvalidationSchema = Yup.object().shape({
  name: Yup.string().min(10).max(40).required("Tour Name is required"),
  duration: Yup.number().required("Duration is required"),
  maxGroupSize: Yup.number().required("Max group size is required"),
  difficulty: Yup.string().oneOf(["easy", "medium", "difficult"]).required(),
  price: Yup.number().required("Price is required"),
  priceDiscount: Yup.number()
    .lessThan(Yup.ref("price"), "Discount must be less than price")
    .nullable(),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string().required("description is required"),
  imageCover: Yup.mixed().required("Image cover is required"),
  images: Yup.array()
    .min(3, "Upload exactly 3 images")
    .max(3, "Upload exactly 3 images"),
  guides: Yup.array(),
  startDates: Yup.array().min(1, "Add at least one start date"),
  startLocation: Yup.object({
    address: Yup.string().required("Start address required"),
    description: Yup.string().required("Start description required"),
    coordinates: Yup.array().length(2, "Provide lng,lat").required(),
  }),
  locations: Yup.array().of(
    Yup.object({
      day: Yup.number().required("Day required"),
      address: Yup.string().required("Address required"),
      description: Yup.string().required("Description required"),
      coordinates: Yup.array().length(2, "Provide lng,lat").required(),
    })
  ),
});
export {
  LoginSchema,
  signupSchema,
  changeSchema,
  editSchema,
  validationSchema,
  editTourValidationSchema,
  addTourvalidationSchema,
};
