import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Rating,
  Box,
} from "@mui/material";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ReviewCard({ review }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 400,
        height: 260,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
          <Avatar src={`/img/users/${review.user.photo}`} />
          <Box>
            <Typography fontWeight="bold">{review.user.name}</Typography>
            <Typography fontSize="0.8em">
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
            <Link to={`/tour/${review?.tour}`}>Tour: {review?.tour}</Link>
          </Box>
        </Box>

        <Rating
          value={review?.rating || 0}
          readOnly
          icon={<FaStar style={{ color: "#f59e0b" }} />}
          emptyIcon={<FaRegStar style={{ color: "#ccc" }} />}
          sx={{ mb: 1 }}
        />
        <Typography variant="body2">{review.review}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
        <Button size="small" variant="contained" color="primary">
          Edit
        </Button>
        <Button size="small" variant="contained" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
