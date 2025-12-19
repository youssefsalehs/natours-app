import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useForgetPass from "../../Hooks/useForgetPass";

export default function ForgotForm() {
  const theme = useTheme();
  const forgetPass = useForgetPass();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
          Forgot Password
        </Typography>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            forgetPass.mutate({ email: values.email });
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="standard"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                disabled={forgetPass.isPending}
              >
                Reset my password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
