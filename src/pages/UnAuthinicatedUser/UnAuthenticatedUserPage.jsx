import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { SiAuthelia } from "react-icons/si";
const UnAuthenticatedUserPage = () => {
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
        <SiAuthelia className="mb-4" />
      </Typography>

      <Typography variant="h5" sx={{ mb: 4 }}>
        Login First or Sign up First
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default UnAuthenticatedUserPage;
