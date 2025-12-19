import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Img1, Img2, Img4 } from "../../constants/images";
const sectionSpacing = {
  py: { xs: 8, md: 14 },
};

const headingSX = {
  fontWeight: 700,
  textAlign: "center",
  fontSize: { xs: "2rem", sm: "2.5rem" },
};

export default function About() {
  return (
    <Box>
      <Box component="section" sx={sectionSpacing}>
        <Box
          sx={{
            display: "flex",
            mx: "auto",
            px: { xs: 2, sm: 8 },
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              About Natours
            </Typography>

            <Typography sx={{ mt: 3, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              Natours is a modern tour booking experience focused on small-group
              adventures, sustainable travel, and unforgettable memories. We
              care about responsible tourism and making every trip effortless
              and safe.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/overview"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  bgcolor: "primary.dark",
                  width: "fit-content",
                  alignSelf: "end",
                }}
              >
                Explore tours
              </Button>

              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  bgcolor: "primary.main",
                  width: "fit-content",
                  alignSelf: "end",
                }}
              >
                Our values
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {[1, 2, 3, 4].map((n) => (
              <Box
                key={n}
                component="img"
                src={`/img/tours/tour-${n}-1.jpg`}
                sx={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mx: "auto",
          px: { xs: 2, sm: 8 },

          py: 4,
        }}
      >
        <Typography variant="h3" sx={headingSX}>
          What we stand for
        </Typography>

        <Typography
          sx={{ textAlign: "center", mt: 2, maxWidth: "700px", mx: "auto" }}
        >
          Small groups. Local guides. Lasting impact. We design tours that
          minimize footprint while maximizing experience.
        </Typography>

        <Box
          sx={{
            mt: 6,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {[
            {
              title: "Small Groups",
              desc: "We keep groups intimate to improve experience and reduce impact.",
            },
            {
              title: "Local Guides",
              desc: "Guides are local experts bringing culture, safety & stories.",
            },
            {
              title: "Sustainable",
              desc: "We partner with conservation projects and offset emissions.",
            },
            {
              title: "Safety First",
              desc: "Certified guides, emergency protocols, and risk briefings.",
            },
          ].map((f) => (
            <Box
              key={f.title}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: "primary.dark",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: "1.1rem",
                }}
              >
                {f.title}
              </Typography>
              <Typography sx={{ mt: 1.5, color: "white", fontSize: "0.9rem" }}>
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
          mx: "auto",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          py: 8,
          px: 8,
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
          <img
            src={Img1}
            alt=""
            className="-ml-10 md:-ml-24 w-[80px] h-[80px] md:w-[120px] md:h-[120px] z-[2] rounded-full border-2 border-white"
          />
          <img
            src={Img2}
            alt=""
            className="-ml-10 md:-ml-24 w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full border-2 border-white"
          />
        </div>

        <Box sx={{ flex: 1, px: { xs: 2, md: 4 } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Ready to travel differently?
          </Typography>
          <Typography>
            Join a small-group Natours trip and make memories that matter.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            my: 2,
            color: "white",
            display: "block",
            bgcolor: "primary.dark",
            width: "fit-content",
            alignSelf: "end",
          }}
        >
          Book Tour Now
        </Button>
      </Box>
    </Box>
  );
}
