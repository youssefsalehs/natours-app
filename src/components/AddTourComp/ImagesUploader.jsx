import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ImagesUploader({
  setFieldValue,
  imagesPreview,
  setImagesPreview,
}) {
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setFieldValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(previews);
  };

  useEffect(() => {
    return () => {
      imagesPreview.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [imagesPreview]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography>Tour Images ({imagesPreview.length})</Typography>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Upload Images
        <input type="file" hidden multiple onChange={handleFilesChange} />
      </Button>

      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        {imagesPreview.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`preview ${i}`}
            style={{ width: 110, borderRadius: 4 }}
          />
        ))}
      </Box>
    </Box>
  );
}
