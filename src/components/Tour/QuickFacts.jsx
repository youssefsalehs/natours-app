import { Avatar, Box, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { CiCalendar, CiStar } from "react-icons/ci";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { MdPerson } from "react-icons/md";
const RoleStyle = {
  display: "flex",
  gap: "1em",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "background.transparent",
  padding: "0.5em",
  borderRadius: "30px",
};
function QuickFacts({ id }) {
  const queryClient = useQueryClient();
  const tourData = queryClient.getQueryData(["tour", id]);
  const tour = tourData?.data?.data;
  const { guides, difficulty, ratingsAverage, maxGroupSize, startDates } = tour;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "4em 0em",
          px: { xs: 2, md: 8 },

          backgroundColor: "background.paper",
        }}
      >
        <div className="mb-20 ">
          <Typography sx={{ fontSize: "2em", marginBottom: "1em" }}>
            Quick facts
          </Typography>
          <div className="flex flex-col gap-4 w-[85%]">
            <div className="flex items-center  text-4xl justify-between w-full">
              <div className=" flex items-center gap-5">
                <CiCalendar />
                <Typography>next date</Typography>
              </div>
              <Typography>
                {new Date(startDates[0]).toLocaleString("en-us", {
                  year: "numeric",
                  month: "long",
                })}
              </Typography>
            </div>
            <div className="flex items-center text-4xl justify-between w-full">
              <div className=" flex items-center gap-5">
                <HiOutlineArrowTrendingUp />
                <Typography>difficulty</Typography>
              </div>
              <Typography>{difficulty}</Typography>
            </div>
            <div className="flex items-center text-4xl justify-between w-full">
              <div className=" flex items-center gap-5">
                <MdPerson />
                <Typography>participants</Typography>
              </div>
              <Typography>{maxGroupSize} people</Typography>
            </div>
            <div className="flex items-center text-4xl justify-between w-full">
              <div className=" flex items-center gap-5">
                <CiStar />
                <Typography>rating</Typography>
              </div>
              <Typography>{ratingsAverage}/5</Typography>
            </div>
          </div>
        </div>

        <div>
          <Typography sx={{ fontSize: "2em", marginBottom: "1em" }}>
            Your tour guides
          </Typography>
          <div className="flex flex-col gap-4 w-[350px]">
            {guides.map((guide, i) => (
              <Box sx={RoleStyle} key={i}>
                <Avatar src={`/img/users/${guide.photo}`} />
                <Typography sx={{ fontWeight: "bold" }}>
                  {guide.name}
                </Typography>
                <Typography>{guide.role}</Typography>
              </Box>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}

export default QuickFacts;
