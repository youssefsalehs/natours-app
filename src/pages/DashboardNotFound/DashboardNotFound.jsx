import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DashboardNotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Oops! This dashboard page does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/dashboard")}
      >
        Go Back to Dashboard
      </Button>
    </Box>
  );
}

export default DashboardNotFound;
