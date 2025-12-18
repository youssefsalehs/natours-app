import { Box, Typography } from "@mui/material";
import { MdError } from "react-icons/md";
const ErrorComponent = ({ error }) => {
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
        <MdError className="mb-4" />
      </Typography>

      <Typography variant="h5" sx={{ mb: 4 }}>
        Oops! Something Went Wrong.{error.message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
