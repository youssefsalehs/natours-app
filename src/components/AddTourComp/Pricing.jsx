import { Box, TextField } from "@mui/material";

export default function Pricing({ values, touched, errors, handleChange }) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
      <TextField
        label="Price"
        type="number"
        name="price"
        value={values.price}
        onChange={handleChange}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
        sx={{ flex: 1 }}
      />

      <TextField
        label="Price Discount"
        type="number"
        name="priceDiscount"
        value={values.priceDiscount}
        onChange={handleChange}
        error={touched.priceDiscount && Boolean(errors.priceDiscount)}
        helperText={touched.priceDiscount && errors.priceDiscount}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
