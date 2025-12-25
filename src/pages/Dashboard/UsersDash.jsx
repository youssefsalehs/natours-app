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
  Card,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import useFetchUsers from "../../Hooks/UseFetchUsers";
import { Link } from "react-router-dom";

import ToggleBtn from "../../components/ToggleBtn/ToggleBtn";
import useSuspendUser from "../../Hooks/useSuspendUser";
function UsersDash() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, isError, error } = useFetchUsers();
  const users = data?.data?.data;

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState({});

  const PER_PAGE = 8;
  const totalPages = Math.ceil(users?.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentUsers = users?.slice(start, start + PER_PAGE);
  const suspend = useSuspendUser(selected?._id);
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
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {currentUsers?.map((user) => (
            <Card
              key={user._id}
              sx={{ width: 500, boxShadow: 3, borderRadius: 2 }}
            >
              <Box display="flex" justifyContent="center" mt={2}>
                <Avatar
                  src={user.photo?.url}
                  alt={user.name}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>

              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  textAlign="center"
                >
                  {user.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>ID:</strong> {user._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="pt-5"
                >
                  <strong>Active:</strong>{" "}
                  <ToggleBtn
                    active={user}
                    isPending={selected._id === user._id && suspend.isPending}
                    handleClick={() => {
                      setSelected(user);
                      handleSuspend();
                    }}
                  />
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center" }}>
                <IconButton color="primary">
                  <FaRegEye />
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
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={user?.photo?.url} />
                  </TableCell>

                  <TableCell align="center">{user._id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    <ToggleBtn
                      active={user}
                      isPending={selected._id === user._id && suspend.isPending}
                      handleClick={() => {
                        setSelected(user);
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
                        component={Link}
                        to={`/useraccount/${user._id}`}
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
    </Box>
  );
}

export default UsersDash;
