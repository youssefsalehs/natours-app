import { Box, Typography } from "@mui/material";

import { LuLoader } from "react-icons/lu";
const LoadingComponent = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        width: "100%",
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
    </Box>
  );
};

export default LoadingComponent;
