import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

function ReviewForm() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "3em",
          p: 5,
          width: { xs: "100%", md: "80%" },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.divider
              : theme.palette.grey[100],
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Review Form
        </Typography>
        <Rating
          name="review-rating"
          sx={{ alignSelf: "center" }}
          size="large"
        />
        <TextField
          fullWidth
          label="Your Review"
          variant="standard"
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewForm;
