import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdReportGmailerrorred } from "react-icons/md";
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

export default function DeleteModal({
  open,
  setOpen,
  handleDelete,
  isPending,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MdReportGmailerrorred className="text-6xl" />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to do delete this?
          </Typography>
          <Box className="flex self-end mt-5 gap-2">
            <Button
              sx={{
                bgcolor: "primary.dark",
                color: "white",
              }}
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              sx={{
                bgcolor: "error.main",
                color: "white",
              }}
              onClick={handleDelete}
              disabled={isPending}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
