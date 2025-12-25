import { TextField, MenuItem } from "@mui/material";

export default function GuidesSelect({
  values,
  touched,
  errors,
  users,
  handleChange,
}) {
  return (
    <TextField
      select
      label="Guides"
      name="guides"
      value={values.guides}
      onChange={handleChange}
      SelectProps={{ multiple: true }}
      fullWidth
      sx={{ mb: 2 }}
      error={touched.guides && Boolean(errors.guides)}
      helperText={touched.guides && errors.guides}
    >
      {users ? (
        users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>Loading...</MenuItem>
      )}
    </TextField>
  );
}
