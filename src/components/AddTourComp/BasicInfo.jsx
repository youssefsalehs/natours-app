import { Box, TextField } from "@mui/material";

export default function BasicInfo({ values, touched, errors, handleChange }) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
      <TextField
        label="Tour Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        sx={{ flex: 1 }}
      />
      <TextField
        label="Duration (days)"
        type="number"
        name="duration"
        value={values.duration}
        onChange={handleChange}
        error={touched.duration && Boolean(errors.duration)}
        helperText={touched.duration && errors.duration}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
