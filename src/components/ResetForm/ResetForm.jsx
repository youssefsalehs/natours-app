import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useResetPass from "../../Hooks/useResetPass";

export default function ResetForm() {
  const theme = useTheme();
  const { mutate: resetPass, isPending } = useResetPass();
  const validationSchema = Yup.object({
    token: Yup.string().required("Token is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    resetPass(
      {
        token: values.token,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
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
          Reset Password
        </Typography>

        <Formik
          initialValues={{ token: "", password: "", passwordConfirm: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="flex gap-3 flex-col">
              <TextField
                fullWidth
                label="Token"
                type="text"
                name="token"
                variant="standard"
                value={values.token}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.token && Boolean(errors.token)}
                helperText={touched.token && errors.token}
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
                label="New Password"
                type="password"
                name="password"
                variant="standard"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                label="Confirm New Password"
                type="password"
                name="passwordConfirm"
                variant="standard"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.passwordConfirm && Boolean(errors.passwordConfirm)
                }
                helperText={touched.passwordConfirm && errors.passwordConfirm}
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
                }}
                disabled={isPending}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
