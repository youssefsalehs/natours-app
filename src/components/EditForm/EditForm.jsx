import { editSchema } from "../../constants/schemas";
import { useFormik } from "formik";
import useEditMe from "../../Hooks/useEditMe";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import { MdPhotoCamera } from "react-icons/md";
function EditForm({ user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState(user?.photo.url || "");
  const { mutate, isPending } = useEditMe(setIsEdit, setPreview);
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

  const theme = useTheme();
  const formik = useFormik({
    validationSchema: editSchema,
    enableReinitialize: true,
    initialValues: {
      email: user.email || "",
      name: user.name || "",
      photo: null,
    },
    onSubmit: (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.photo) formData.append("photo", data.photo);
      mutate(formData);
    },
  });
  return (
    <div>
      <Button
        component="div"
        onClick={() => setIsEdit((p) => !p)}
        sx={{
          mb: 4,
          color: "white",
          display: "block",
          bgcolor: "primary.dark",
          width: "fit-content",
        }}
      >
        {isEdit ? "Close" : "Edit Info"}
      </Button>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2em",
          width: "100%",
        }}
        onSubmit={formik.handleSubmit}
      >
        <div className="flex items-center gap-2">
          <Box sx={{ position: "relative", width: 100 }}>
            <Avatar src={preview} sx={{ width: 100, height: 100 }} />
            {isEdit && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.dark",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                <MdPhotoCamera className="text-xs" />
                <input
                  hidden
                  name="photo"
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue("photo", file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </IconButton>
            )}
          </Box>

          <TextField
            fullWidth
            label="Name"
            value={formik.values.name}
            disabled={!isEdit}
            onChange={formik.handleChange}
            type="text"
            name="name"
            variant="outlined"
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name ? formik.errors.name : ""}
            InputLabelProps={{
              shrink: true,
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

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          disabled={!isEdit}
          value={formik.values.email}
          onChange={formik.handleChange}
          variant="outlined"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email ? formik.errors.email : ""}
          InputLabelProps={{
            shrink: true,
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
          label="Created At"
          type="date"
          value={formatDate(user?.createdAt)}
          disabled={true}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
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
          label="Role"
          name="role"
          type="text"
          value={user?.role}
          variant="outlined"
          disabled={true}
          InputLabelProps={{
            shrink: true,
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

        {isEdit && (
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              my: 2,
              color: "white",
              alignSelf: "end",
              bgcolor: "primary.dark",
              width: "fit-content",
            }}
          >
            {isPending ? "saving...." : "save"}
          </Button>
        )}
      </Box>
    </div>
  );
}

export default EditForm;
