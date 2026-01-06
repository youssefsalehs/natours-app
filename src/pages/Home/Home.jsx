import { Typography } from "@mui/material";
import AppHero from "../../components/AppHero/AppHero";
import BestTourCard from "../../components/Tour/BestTourCard";
import useFetchBestTours from "../../Hooks/useFetchBestTours";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { Box, Container, Stack } from "@mui/material";
import { logos } from "../../constants/trustedBy";
import {
  FaRegSmile,
  FaGlobe,
  FaSuitcaseRolling,
  FaHiking,
} from "react-icons/fa";
function Home() {
  const { data, isLoading, isError, error } = useFetchBestTours();
  const tours = data?.data?.data;
  return (
    <>
      <div>
        <AppHero />
      </div>
      <Box component="section" sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            All in one, authentic travel experiences
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            We create unforgettable tours for every kind of traveler, whether
            you’re seeking luxury comfort, budget-friendly adventures, family
            fun, or adrenaline-packed experiences. From local gems to global
            destinations, our expert guides and carefully curated itineraries
            ensure every journey is authentic, safe, and full of memorable
            moments. Your next adventure starts here, exactly the way you want
            it.
          </Typography>

          <Stack
            direction={"row"}
            justifyContent="center"
            sx={{
              gap: { sm: 2, md: 5 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaSuitcaseRolling size={32} />
              <Typography variant="subtitle1">Luxury</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaHiking size={32} />
              <Typography variant="subtitle1">Adventure</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaRegSmile size={32} />
              <Typography variant="subtitle1">Family-friendly</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaGlobe size={32} />
              <Typography variant="subtitle1">Global Tours</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box component="section" sx={{ py: 10, bgcolor: "contrast" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 1 }}
          >
            Trusted by
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Our travelers and partners trust us for safe, authentic, and
            unforgettable experiences.
          </Typography>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            {logos.map((logo, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  m: { xs: 1, md: 2 },
                  textAlign: "center",
                }}
              >
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  style={{
                    width: "100%",
                    maxWidth: 150,
                    height: "auto",
                    margin: "0 auto",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
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
