import useFetchTours from "../../Hooks/useFetchTours";
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
  Pagination,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import useDeleteTour from "../../Hooks/useDeleteTour";
function ToursDash() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, isError, error } = useFetchTours();
  const [open, setOpen] = useState(false);
  const tours = data?.data?.data;
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const deleteTour = useDeleteTour(selected, setOpen);

  const PER_PAGE = 8;
  const totalPages = Math.ceil(tours?.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentTours = tours?.slice(start, start + PER_PAGE);
  const handleDelete = () => {
    deleteTour.mutate();
  };
  return (
    <>
      <div className="flex justify-end">
        <Button
          component={Link}
          to={"/dashboard/addTour"}
          sx={{
            mb: 1,
            p: 1,
            display: "flex",
            backgroundColor: "primary.light",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            bgcolor: "primary.dark",
            color: "white",
          }}
        >
          <MdOutlineAddLocationAlt size={22} />
          <Typography sx={{ fontSize: 16 }}>Add Tour</Typography>
        </Button>
      </div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {isMobile ? (
          <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
            {currentTours?.map((tour) => (
              <Card
                key={tour._id}
                sx={{ width: 500, boxShadow: 3, borderRadius: 2 }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={tour.imageCover.url}
                  alt={tour.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {tour.name}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    ID: {tour._id}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Price: ${tour.price}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Avg Rating: {tour.ratingsAverage}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Secret: {tour.secret ? "Yes" : "No"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/tour/${tour._id}`}
                  >
                    <FaRegEye />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    component={Link}
                    to={`/dashboard/editTour/${tour._id}`}
                  >
                    <FaRegEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setSelected(tour._id);
                    }}
                  >
                    <MdDelete />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>

                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Avg Rating</TableCell>
                  <TableCell align="center">Secret</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTours?.map((tour) => (
                  <TableRow key={tour._id}>
                    <TableCell align="center">
                      <img src={tour.imageCover.url} className="w-[150px]" />
                    </TableCell>
                    <TableCell align="center">{tour._id}</TableCell>
                    <TableCell align="center">{tour.name}</TableCell>
                    <TableCell align="center">${tour.price}</TableCell>
                    <TableCell align="center">{tour.ratingsAverage}</TableCell>
                    <TableCell align="center">
                      {tour.secretTour ? "Yes" : "No"}
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
                          component={Link}
                          to={`/tour/${tour._id}`}
                        >
                          <FaRegEye />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="secondary"
                          component={Link}
                          to={`/dashboard/editTour/${tour._id}`}
                        >
                          <FaRegEdit />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setOpen(true);
                            setSelected(tour._id);
                          }}
                        >
                          <MdDelete />
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
        <DeleteModal
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
          isPending={deleteTour.isPending}
        />
      </Box>
    </>
  );
}

export default ToursDash;
