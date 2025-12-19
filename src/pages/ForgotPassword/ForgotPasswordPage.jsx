import { Box } from "@mui/material";
import { Img3 } from "../../constants/images";
import ForgotForm from "../../components/ForgotForm/ForgotForm";

function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "100vh", md: "auto" },
          p: 2,
        }}
      >
        <ForgotForm />
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={Img3} className="h-full w-full object-cover" />
      </Box>
    </div>
  );
}

export default ForgotPasswordPage;
