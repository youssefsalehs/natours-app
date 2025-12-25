import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Grid,
  Pagination,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useFetchReviews from "../../Hooks/useFetchReviews";
import ViewModal from "../../components/ViewModal";
import ToggleBtn from "../../components/ToggleBtn/ToggleBtn";
import useSuspendReview from "../../Hooks/useSuspendReview";

function ReviewsDash() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, isError, error } = useFetchReviews();

  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState({});
  const reviews = data?.data?.data;
  const suspend = useSuspendReview(selected?._id);
  const [page, setPage] = useState(1);

  const PER_PAGE = 8;
  const totalPages = Math.ceil(reviews?.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentReviews = reviews?.slice(start, start + PER_PAGE);
  const handleSuspend = () => {
    suspend.mutate();
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",

        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {currentReviews?.map((review) => (
            <Paper key={review._id} sx={{ p: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography color="text.secondary">ID</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{review._id}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Rating</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{review.rating}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">User</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{review.user.name}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">User ID</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{review.user._id}</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1} alignItems="center" sx={{ mt: 2 }}>
                <Grid item>
                  <IconButton size="small" color="primary">
                    <FaRegEye />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton size="small" color="secondary">
                    <FaRegEdit />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton size="small" color="error">
                    <MdDelete />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">User ID</TableCell>
                <TableCell align="center">Tour ID</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReviews?.map((review) => (
                <TableRow key={review._id}>
                  <TableCell align="center">{review._id}</TableCell>
                  <TableCell align="center">{review.rating}</TableCell>
                  <TableCell align="center">{review.user.name}</TableCell>
                  <TableCell align="center">{review.user._id}</TableCell>
                  <TableCell align="center">{review.tour}</TableCell>
                  <TableCell align="center">
                    <ToggleBtn
                      active={review}
                      isPending={
                        selected._id === review._id && suspend.isPending
                      }
                      handleClick={() => {
                        setSelected(review);
                        handleSuspend();
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={"center"}
                      gap={1}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setOpenView(true);
                          setSelected(review);
                        }}
                      >
                        <FaRegEye />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        mt={3}
        mb={3}
        display="flex"
        justifyContent="center"
        alignItems={"end"}
      >
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={(e, value) => setPage(value)}
          size={isMobile ? "small" : "medium"}
        />
      </Box>
      <ViewModal open={openView} setOpen={setOpenView} review={selected} />
    </Box>
  );
}

export default ReviewsDash;
