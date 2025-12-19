import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../constants/schemas";
import useLogin from "../../Hooks/useLogin";

function LoginForm() {
  const { mutate, isPending } = useLogin();
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "3em",
          p: 5,
          width: { xs: "100%", md: "80%" },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey[100],
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email ? formik.errors.email : ""}
          variant="standard"
          InputLabelProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[300]
                  : undefined,
            },
          }}
          InputProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[100]
                  : undefined,
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password ? formik.errors.password : ""}
          variant="standard"
          InputLabelProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[300]
                  : undefined,
            },
          }}
          InputProps={{
            style: {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[100]
                  : undefined,
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 5,
          }}
        >
          <Link to={"/forgotPassword"} className="underline">
            Forgot Password?
          </Link>

          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              bgcolor: "primary.dark",
              width: "fit-content",
            }}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
