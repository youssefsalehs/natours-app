import { Box, Stack, Typography } from "@mui/material";
import TourCard from "../../components/Tour/TourCard";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";

import ErrorPage from "../ErrorPage/ErrorPage";
import useFetchTours from "../../Hooks/useFetchTours";
import { PiAirplaneInFlightFill } from "react-icons/pi";
function OverviewPage() {
  const { data, isLoading, isError, error } = useFetchTours();
  const tours = data?.data?.data;
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage error={error} />;
  if (!isError && tours.length === 0) {
    return (
      <Box
        sx={{
          height: "89vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 30 }}>
            No tours matched your search
          </Typography>

          <Typography className="flex items-center gap-2" sx={{ fontSize: 20 }}>
            Try searching for another tour <PiAirplaneInFlightFill size={30} />
          </Typography>
        </Stack>
      </Box>
    );
  }
  return (
    <div className=" py-2 w-full max-w-[1500px] mx-auto">
      <Typography
        variant={"h4"}
        sx={{
          my: 5,
          p: 1,
          borderRadius: "25px",
          color: "primary.main",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Our Tours
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 px-8 items-stretch ">
        {tours.map((tour) => (
          <TourCard tour={tour} key={tour.id} />
        ))}
      </div>
    </div>
  );
}

export default OverviewPage;
