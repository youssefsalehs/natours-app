import { Box, TextField, MenuItem } from "@mui/material";

export default function GroupSizeDifficulty({
  values,
  errors,
  touched,
  handleChange,
}) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
      <TextField
        label="Max Group Size"
        type="number"
        name="maxGroupSize"
        value={values.maxGroupSize}
        onChange={handleChange}
        error={touched.maxGroupSize && Boolean(errors.maxGroupSize)}
        helperText={touched.maxGroupSize && errors.maxGroupSize}
        sx={{ flex: 1 }}
      />
      <TextField
        select
        label="Difficulty"
        name="difficulty"
        value={values.difficulty}
        onChange={handleChange}
        error={touched.difficulty && Boolean(errors.difficulty)}
        helperText={touched.difficulty && errors.difficulty}
        sx={{ flex: 1 }}
      >
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="difficult">Difficult</MenuItem>
      </TextField>
    </Box>
  );
}
