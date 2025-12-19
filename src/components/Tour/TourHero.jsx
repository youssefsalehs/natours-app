import { Typography, useTheme, Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function TourHero({ id }) {
  const queryClient = useQueryClient();
  const tourData = queryClient.getQueryData(["tour", id]);
  const tour = tourData?.data?.data;
  const { imageCover: cover, name, duration, startLocation } = tour;
  const theme = useTheme();

  const headingStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%) skewY(-4deg)",
    wordBreak: "break-word",
    background: `linear-gradient(
      to bottom right,
      ${theme.palette.primary.light}CC,
      ${theme.palette.primary.main}CC
    )`,
    fontSize: "2em",
    padding: "12px 20px",
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    zIndex: 2,
  };

  const detailStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    background: theme.palette.background.paper,
    transform: "skewY(-4deg)",
    padding: "8px 16px",
    borderRadius: "20px",
    color: theme.palette.text.primary,
    fontWeight: 500,
  };

  return (
    <div className="w-full flex justify-center items-center h-[75vh] overflow-hidden relative">
      <img
        src={cover.url}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Tour Hero"
      />

      <Typography sx={headingStyle}>{name}</Typography>

      <Box
        sx={{
          position: "absolute",
          top: "55%",
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography sx={detailStyle}>
          <FaRegClock /> {duration} Days
        </Typography>
        <Typography sx={detailStyle}>
          <FaLocationDot />
          {startLocation.description}
        </Typography>
      </Box>
    </div>
  );
}

export default TourHero;
