import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FaSpinner } from "react-icons/fa6";
import { useFormik } from "formik";
import { reviewSchema } from "../../constants/schemas";
import useAddReview from "../../Hooks/useAddReview";

function ReviewForm({ tourId }) {
  const theme = useTheme();
  const { mutate, isPending } = useAddReview(tourId);

  const formik = useFormik({
    validationSchema: reviewSchema,
    enableReinitialize: true,
    initialValues: {
      review: "",
      rating: 0,
    },
    onSubmit: (data, { resetForm }) => {
      mutate({ ...data, tour: tourId });
      resetForm();
    },
  });
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "3em",
          p: 5,
          width: { xs: "100%", md: "80%" },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey[100],
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Review Form
        </Typography>
        <Rating
          name="rating"
          sx={{ alignSelf: "center" }}
          value={formik.values.rating}
          onChange={(event, newValue) =>
            formik.setFieldValue("rating", newValue)
          }
          size="large"
        />
        <TextField
          fullWidth
          label="Your Review"
          name="review"
          value={formik.values.review}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
          variant="standard"
          InputLabelProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[300]
                  : undefined,
            },
          }}
          InputProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[100]
                  : undefined,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{
            alignSelf: "flex-end",
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewForm;
