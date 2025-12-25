import * as React from "react";
import { Box, Button, Typography, Modal, Avatar, Rating } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa6";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
};

export default function ViewModal({ open, setOpen, review }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal-title"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7em",
            mb: 2,
          }}
        >
          <Avatar
            src={`/img/users/${review?.user?.photo}`}
            sx={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.1em" }}>
              {review?.user?.name}
            </Typography>
            <Typography sx={{ fontSize: "0.85em", color: "gray" }}>
              {new Date(review?.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Rating
          value={review?.rating || 0}
          readOnly
          sx={{ mb: 2 }}
          icon={<FaStar style={{ color: "secondary.dark" }} />}
          emptyIcon={<FaRegStar style={{ color: "#ccc" }} />}
        />

        <Typography sx={{ mb: 3 }}>{review?.review}</Typography>
        <Typography sx={{ mb: 3 }}>
          <span className="font-semibold">Tour:</span> {review?.tour}
        </Typography>
        <Button
          sx={{
            alignSelf: "self-end",
            bgcolor: "primary.dark",
            color: "white",
          }}
          onClick={() => setOpen(false)}
        >
          close
        </Button>
      </Box>
    </Modal>
  );
}
