import { Box, TextField, Typography } from "@mui/material";

export default function StartLocation({ values, handleChange, setFieldValue }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ mb: 2 }}>Start Location</Typography>

      <TextField
        label="Address"
        name="startLocation.address"
        value={values.startLocation.address || ""}
        onChange={handleChange}
        sx={{ mb: 1 }}
        fullWidth
      />

      <TextField
        label="Description"
        name="startLocation.description"
        value={values.startLocation.description || ""}
        onChange={handleChange}
        sx={{ mb: 1 }}
        fullWidth
      />
      <TextField
        label="Coordinates (lng,lat)"
        placeholder="-80.185942,25.774772"
        value={(values.startLocation.coordinates || []).join(",")}
        onChange={(e) => {
          const coords = e.target.value.split(",").map((c) => c.trim());

          setFieldValue(
            "startLocation.coordinates",
            coords.map((c) => (c === "" ? "" : Number(c)))
          );
        }}
        fullWidth
      />
    </Box>
  );
}
