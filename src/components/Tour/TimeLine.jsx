import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography, useTheme } from "@mui/material";

export default function AlternateReverseTimeline({ stops }) {
  const theme = useTheme();
  return (
    <Timeline position="alternate-reverse" sx={{ py: 8 }}>
      {stops?.map((step, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            ></TimelineDot>
            {index < stops?.length - 1 && (
              <TimelineConnector
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[700]
                      : theme.palette.grey[300],
                }}
              />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {step.description}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
