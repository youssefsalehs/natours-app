import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { Img4 } from "../../constants/images";
import { useParams } from "react-router-dom";
import api from "../../api/axiosconfig";
import useAuth from "../../Store/useAuth";
import About from "../../components/Tour/About";
import ImgSlide from "../../components/Tour/ImgSlide";
import QuickFacts from "../../components/Tour/QuickFacts";
import ReviewForm from "../../components/Tour/ReviewForm";
import TourHero from "../../components/Tour/TourHero";
import TimeLine from "../../components/Tour/TimeLine";
import ReviewCard from "../../components/Tour/ReviewCard";
import useFetchTour from "../../Hooks/useFetchTour";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ErrorPage from "../ErrorPage/ErrorPage";

function TourDetailsPage() {
  const token = useAuth((store) => store.token);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchTour(id);
  const tour = data?.data?.data;
  const theme = useTheme();

  async function handleCheckout(tourId) {
    const res = await api.get(`/bookings/checkout-session/${tourId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const session = res.data.session;

    window.location.href = session.url;
  }
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorPage error={error} />;
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <TourHero id={id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 py-16">
        <QuickFacts id={id} />
        <About id={id} name={tour.name} description={tour.description} />
      </div>

      <div className="w-full py-16 px-4 md:px-8">
        <ImgSlide imgs={tour.images} />
      </div>
      <Box
        sx={{
          py: 8,
          px: { xs: 4, md: 8 },
          backgroundImage: `url(${tour?.imageCover?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            overflowX: "auto",
            alignItems: "stretch",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {tour?.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Stack>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 py-8">
        <Typography className="col-span-1 lg:col-span-2 !font-bold !text-2xl">
          Timeline & Review
        </Typography>
        <TimeLine stops={tour.locations} />
        <ReviewForm />
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
          width: "90%",
          mx: "auto",
          mb: 5,
          justifyContent: "space-between",
          bgcolor: "background.paper",
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.08), 0px 8px 16px rgba(0,0,0,0.04)",
          py: 8,
          px: 18,
          borderRadius: 4,
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <div className="flex items-center justify-center md:justify-start ">
          <img
            src={Img4}
            alt=""
            className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] z-[3] rounded-full border-2 border-white"
          />
        </div>

        <Box sx={{ flex: 1, px: { xs: 2, md: 4 } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            What are you waiting for?
          </Typography>
          <Typography>
            5 days. 1 adventure. Infinite memories. Make it yours today!
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: { xs: 3, md: 0 },
            borderRadius: "30px",
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
            px: 4,
            py: 1.5,
          }}
          onClick={() => handleCheckout(tour._id)}
        >
          Book Tour Now
        </Button>
      </Box>
    </div>
  );
}

export default TourDetailsPage;
