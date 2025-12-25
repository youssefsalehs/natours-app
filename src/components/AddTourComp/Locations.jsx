import { Box, Button, TextField, Typography } from "@mui/material";

export default function Locations({ values, setFieldValue }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ mb: 2 }}>Tour Locations</Typography>

      {values.locations.map((loc, idx) => (
        <Box
          key={idx}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <TextField
            label="Day"
            type="number"
            value={loc.day || ""}
            onChange={(e) =>
              setFieldValue(`locations[${idx}].day`, Number(e.target.value))
            }
            sx={{ mb: 1 }}
            fullWidth
          />

          <TextField
            label="Address"
            value={loc.address || ""}
            onChange={(e) =>
              setFieldValue(`locations[${idx}].address`, e.target.value)
            }
            sx={{ mb: 1 }}
            fullWidth
          />

          <TextField
            label="Description"
            value={loc.description || ""}
            onChange={(e) =>
              setFieldValue(`locations[${idx}].description`, e.target.value)
            }
            sx={{ mb: 1 }}
            fullWidth
          />

          <TextField
            label="Coordinates (lng,lat)"
            placeholder="-80.128473,25.781842"
            value={(loc.coordinates || []).join(",")}
            onChange={(e) => {
              const raw = e.target.value.split(",");

              setFieldValue(
                `locations[${idx}].coordinates`,
                raw.map((c) => (c.trim() === "" ? "" : Number(c.trim())))
              );
            }}
            fullWidth
            sx={{ mb: 1 }}
          />

          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              setFieldValue(
                "locations",
                values.locations.filter((_, i) => i !== idx)
              )
            }
            sx={{ mt: 1 }}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={() =>
          setFieldValue("locations", [
            ...values.locations,
            { day: "", address: "", description: "", coordinates: [] },
          ])
        }
      >
        Add Location
      </Button>
    </Box>
  );
}
