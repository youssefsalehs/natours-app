import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Button, useTheme } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BestTourCard({ tour }) {
  const theme = useTheme();

  const headingStyle = {
    position: "absolute",
    left: 0,
    bottom: "-55px",
    width: "100%",
    padding: "10px",
    transform: "skewY(-2deg)",
    textAlign: "center",
    background: `linear-gradient(
      to bottom right,
      ${theme.palette.primary.light},
      ${theme.palette.primary.main}
    )`,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "1.25rem",
    zIndex: 2,
  };

  const detailsBox = {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    color: theme.palette.text.secondary,
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component="div"
        sx={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box sx={{ position: "relative", mb: 4 }}>
          <CardMedia
            component="img"
            height="180"
            image={tour?.imageCover.url}
            alt="Tour Image"
            sx={{
              transform: "rotate(-2deg) scale(1.1)",
              transition: "transform 0.3s ease",
              width: "100%",
            }}
          />
          <Typography sx={headingStyle}>{tour?.name}</Typography>
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                marginTop: "2em",
                marginBottom: "1em",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              {`${tour?.difficulty} tour`}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {tour?.summary}
            </Typography>

            <Box sx={{ ...detailsBox, mt: 2 }}>
              <FaLocationDot />
              <Typography>{tour?.startLocation?.description}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography>
                ${tour.price} <sub>per person</sub>
              </Typography>
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary.main,
                  fontWeight: 500,
                }}
              >
                {tour.ratingsAverage} <sub>average rating</sub>
              </Typography>
            </Box>

            <Link
              to={`/tour/${tour?.id}`}
              onClick={() => window.scrollTo({ top: 0 })}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  bgcolor: "primary.dark",
                  width: "fit-content",
                  alignSelf: "end",
                }}
              >
                Details
              </Button>
            </Link>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BestTourCard;
