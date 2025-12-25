import { Box, Button, Typography } from "@mui/material";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
function UnauthorizedPage() {
  return (
    <div>
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
          <FaLock className="mb-4" />
        </Typography>

        <Typography variant="h5" sx={{ mb: 4 }}>
          You're not authorized
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go Home
        </Button>
      </Box>
    </div>
  );
}

export default UnauthorizedPage;
