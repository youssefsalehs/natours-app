import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoWarningOutline } from "react-icons/io5";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: 24,
  p: 4,
};

export default function WarningModal({ open, setOpen, handleOp, msg }) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);

    try {
      await handleOp();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IoWarningOutline className="text-6xl" />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          <Box className="flex self-end mt-5 gap-2">
            <Button
              sx={{
                bgcolor: "primary.dark",
                color: "white",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                bgcolor: "error.main",
                color: "white",
                "&.Mui-disabled": {
                  bgcolor: "#f7b0b0",
                  color: "#ffffffa6",
                  opacity: 1,
                  cursor: "not-allowed",
                },
              }}
              disabled={loading}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
