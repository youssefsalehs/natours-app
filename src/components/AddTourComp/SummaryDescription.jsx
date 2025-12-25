import { TextField } from "@mui/material";

export default function SummaryDescription({
  values,
  touched,
  errors,
  handleChange,
}) {
  return (
    <>
      <TextField
        label="Summary"
        name="summary"
        value={values.summary}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={1}
        error={touched.summary && Boolean(errors.summary)}
        helperText={touched.summary && errors.summary}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        sx={{ mb: 2 }}
      />
    </>
  );
}
