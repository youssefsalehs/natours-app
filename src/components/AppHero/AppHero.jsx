import { Typography, Box } from "@mui/material";

import useAuth from "../../Store/useAuth";

function AppHero() {
  const isLogged = useAuth((state) => state.isLogged);
  const user = useAuth((state) => state.user);

  return (
    <Box className="w-full h-[65vh] relative flex flex-col justify-center items-center overflow-hidden">
      <img
        src="/img/tours/tour-1-1.jpg"
        alt="App Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) skew(8deg)",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "secondary.main",
          }}
        >
          OUTDOORS
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            mb: 4,
            color: "secondary.main",
          }}
        >
          Is Where Life Happens
        </Typography>
        {!isLogged ? (
          <>
            {" "}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 4,
                color: "text.secondary",
              }}
            >
              Wanna Join Us And Explore More?
            </Typography>
          </>
        ) : (
          <Typography variant="h3">
            Welcome, {user?.name?.split(" ")[0]}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AppHero;
