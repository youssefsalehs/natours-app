import { Box, Typography } from "@mui/material";

import { LuLoader } from "react-icons/lu";
const LoadingScreen = () => {
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
        <LuLoader className="mb-4 animate-spin" />
      </Typography>

      <Typography variant="h5" sx={{ mb: 4 }}>
        Loading ...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
