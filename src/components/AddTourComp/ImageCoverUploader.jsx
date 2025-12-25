import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ImageCoverUploader({
  setFieldValue,
  imageCoverPreview,
  setImageCoverPreview,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFieldValue("imageCover", file);
    setImageCoverPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (imageCoverPreview) URL.revokeObjectURL(imageCoverPreview);
    };
  }, [imageCoverPreview]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography>Image Cover</Typography>

      <Button variant="contained" component="label" sx={{ mt: 1 }}>
        Upload Image Cover
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {imageCoverPreview && (
        <Box sx={{ mt: 1 }}>
          <img
            src={imageCoverPreview}
            alt="preview"
            style={{ width: 150, borderRadius: 4 }}
          />
        </Box>
      )}
    </Box>
  );
}
