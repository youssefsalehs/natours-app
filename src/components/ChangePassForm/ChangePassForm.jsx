import { Box, Button, TextField, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { changeSchema } from "../../constants/schemas";
import useChangePassword from "../../Hooks/useChangePassword";
export default function ChangePassForm() {
  const { mutate, isPending } = useChangePassword();
  const formik = useFormik({
    validationSchema: changeSchema,
    initialValues: {
      passwordCurrent: "",
      passwordNew: "",
      passwordNewConfirm: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const theme = useTheme();

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        width: "100%",
        gap: 5,
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex  flex-col mt-10 gap-8 md:justify-evenly w-full md:w-[70%]">
        <TextField
          label="Current Password"
          variant="outlined"
          type="password"
          name="passwordCurrent"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordCurrent && formik.errors.passwordCurrent
          }
          helperText={
            formik.touched.passwordCurrent ? formik.errors.passwordCurrent : ""
          }
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
          label="New Password"
          variant="outlined"
          type="password"
          name="passwordNew"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordNew && formik.errors.passwordNew}
          helperText={
            formik.touched.passwordNew ? formik.errors.passwordNew : ""
          }
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
          label="Confirm New Password "
          variant="outlined"
          type="password"
          name="passwordNewConfirm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordNewConfirm &&
            formik.errors.passwordNewConfirm
          }
          helperText={
            formik.touched.passwordNewConfirm
              ? formik.errors.passwordNewConfirm
              : ""
          }
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
      </div>

      <Button
        variant="contained"
        size="large"
        type="submit"
        disabled={isPending}
        sx={{
          my: 2,
          color: "white",
          display: "block",
          bgcolor: "primary.dark",
          width: "fit-content",
        }}
      >
        {isPending ? "changing..." : "Change Password"}
      </Button>
    </Box>
  );
}
