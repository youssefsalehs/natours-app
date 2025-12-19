import { Box, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

function About({ id }) {
  const queryClient = useQueryClient();
  const tourData = queryClient.getQueryData(["tour", id]);
  const tour = tourData?.data?.data;
  const { description, name } = tour;
  const paragraphs = description.split("\n");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "4em 0em",
        px: { xs: 2, md: 8 },
        mx: "auto",
      }}
    >
      <Typography sx={{ fontSize: "2em", marginBottom: "1em" }}>
        About {name} tour
      </Typography>
      {paragraphs.map((pg, i) => (
        <p className="mb-5 text-[1.4em]" key={i}>
          {pg}
        </p>
      ))}
    </Box>
  );
}

export default About;
