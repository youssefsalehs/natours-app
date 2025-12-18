import { Box } from "@mui/material";
import { Img3 } from "../../constants/images";
import SignupForm from "../../components/SignupForm/SignupForm";

function SignupPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "100vh", md: "auto" },
          p: 2,
        }}
      >
        <SignupForm />
      </Box>
      <Box sx={{ height: "100vh", display: { xs: "none", md: "block" } }}>
        <img src={Img3} className="h-full" />
      </Box>
    </div>
  );
}

export default SignupPage;
