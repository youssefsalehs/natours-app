import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";
const PageNotFound = () => {
  return (
    <Box
      sx={{
        height: "77vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2">
        <MdError className="mb-4" />
      </Typography>

      <Typography variant="h5" sx={{ mb: 4 }}>
        Oops! Page not found.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
