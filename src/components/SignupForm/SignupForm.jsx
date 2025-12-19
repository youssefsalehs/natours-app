import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import useSignup from "../../Hooks/useSignup";

import { useFormik } from "formik";
import { signupSchema } from "../../constants/schemas";

export default function SignupForm() {
  const { mutate, isPending } = useSignup();
  const formik = useFormik({
    validationSchema: signupSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
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
        onSubmit={formik.handleSubmit}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Create A New Account
        </Typography>

        <TextField
          fullWidth
          label="Name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name ? formik.errors.name : ""}
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
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : ""}
          type="email"
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
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm ? formik.errors.passwordConfirm : ""
          }
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            my: 2,
            color: "white",
            display: "block",
            bgcolor: "primary.dark",
            width: "fit-content",
            alignSelf: "end",
          }}
        >
          {isPending ? "Regestering ..." : "Create New Account"}
        </Button>
      </Box>
    </Box>
  );
}
