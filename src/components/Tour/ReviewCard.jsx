import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Rating,
  Box,
  TextField,
} from "@mui/material";
import DeleteModal from "../DeleteModal/DeleteModal";
import { MdEdit, MdDelete, MdSave, MdClose } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Store/useAuth";
import useDeleteReview from "../../Hooks/useDeleteReview";
import useEditReview from "../../Hooks/useEditReview";
import { reviewSchema } from "../../constants/schemas";

export default function ReviewCard({ review }) {
  const user = useAuth((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteMutate, isPending: isDeletingPending } =
    useDeleteReview(review.tour);
  const { mutate: editMutate, isPending: isEditingPending } = useEditReview(
    review.tour
  );

  const formik = useFormik({
    initialValues: {
      review: review.review,
      rating: review.rating || 0,
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      editMutate({ id: review._id, ...values });
      setIsEditing(false);
    },
  });

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "divider",
        color: "text.primary",
        borderRadius: 3,
        mx: "auto",
        my: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1, px: 3, pt: 2, pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              src={`/img/users/${review.user.photo}`}
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Typography fontWeight={600} fontSize="1rem">
                {review.user.name}
              </Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                style={{
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  marginTop: 2,
                  display: "inline-block",
                }}
              >
                Tour: {review?.tour}
              </Typography>
            </Box>
          </Box>

          {review?.user._id === user?._id && (
            <CardActions sx={{ p: 0 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "50%",
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    onClick={formik.handleSubmit}
                    disabled={isEditingPending}
                  >
                    <MdSave size={20} />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      borderRadius: "50%",
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      padding: 0,
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                    onClick={() => setIsEditing(false)}
                  >
                    <MdClose size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isEditingPending}
                    sx={{
                      borderRadius: "50%",
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    <MdEdit size={20} />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setIsDeleting(true)}
                    sx={{
                      borderRadius: "50%",
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      padding: 0,
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                  >
                    <MdDelete size={20} />
                  </Button>
                </>
              )}
            </CardActions>
          )}
        </Box>

        {isDeleting && (
          <DeleteModal
            open={isDeleting}
            setOpen={setIsDeleting}
            handleDelete={() => deleteMutate(review?._id)}
            isPending={isDeletingPending}
          />
        )}

        {isEditing ? (
          <>
            <Rating
              name="rating"
              value={formik.values.rating}
              onChange={(_, value) => formik.setFieldValue("rating", value)}
              icon={<FaStar style={{ color: "#fbbf24" }} />}
              emptyIcon={<FaRegStar style={{ color: "#d1d5db" }} />}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              multiline
              minRows={2}
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              error={formik.touched.review && Boolean(formik.errors.review)}
              helperText={formik.touched.review && formik.errors.review}
              sx={{ mt: 1 }}
            />
          </>
        ) : (
          <>
            <Rating
              value={review?.rating || 0}
              readOnly
              icon={<FaStar style={{ color: "#fbbf24" }} />}
              emptyIcon={<FaRegStar style={{ color: "#d1d5db" }} />}
              sx={{ mb: 1 }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              {review.review}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
