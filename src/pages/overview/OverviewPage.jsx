import { Typography } from "@mui/material";
import TourCard from "../../components/Tour/TourCard";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";

import ErrorPage from "../ErrorPage/ErrorPage";
import useFetchTours from "../../Hooks/useFetchTours";

function OverviewPage() {
  const { data, isLoading, isError, error } = useFetchTours();
  const tours = data?.data?.data;
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage error={error} />;
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
