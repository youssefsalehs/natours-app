import { Typography } from "@mui/material";
import AppHero from "../../components/AppHero/AppHero";
import BestTourCard from "../../components/Tour/BestTourCard";
import useFetchBestTours from "../../Hooks/useFetchBestTours";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
function Home() {
  const { data, isLoading, isError, error } = useFetchBestTours();
  const tours = data?.data?.data;
  return (
    <>
      <div>
        <AppHero />
      </div>
      <div className="flex flex-col py-8 ">
        <Typography
          variant={"h4"}
          sx={{
            my: 3,
            p: 1,
            borderRadius: "25px",
            color: "primary.main",
            width: "fit-content",
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          Most Popular Tours
        </Typography>
        <div className="px-8 min-h-[20vh]">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[20vh]">
              <LoadingComponent />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center min-h-[20vh]">
              <ErrorComponent error={error} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {tours.map((tour) => (
                <BestTourCard tour={tour} key={tour.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
