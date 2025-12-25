import { Box, Button, TextField, Typography, Chip } from "@mui/material";
import { useState } from "react";

export default function StartDates({ values, setFieldValue }) {
  const [currentDate, setCurrentDate] = useState("");

  const handleAddDate = () => {
    if (!currentDate) return;
    if (values.startDates.includes(currentDate)) return;
    setFieldValue("startDates", [...values.startDates, currentDate]);
    setCurrentDate("");
  };

  const handleRemoveDate = (idx) => {
    setFieldValue(
      "startDates",
      values.startDates.filter((_, i) => i !== idx)
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ mb: 2 }}>Start Dates</Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
        <TextField
          type="date"
          InputLabelProps={{ shrink: true }}
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddDate}>
          Add
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        {values.startDates.map((date, idx) => (
          <Chip
            key={idx}
            label={date}
            onDelete={() => handleRemoveDate(idx)}
            color="primary"
          />
        ))}
      </Box>
    </Box>
  );
}
