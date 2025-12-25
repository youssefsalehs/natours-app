export default function buildTourFormData(values) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, val]) => {
    if (val === null || val === undefined) return;

    if (key === "images" && Array.isArray(val)) {
      val.forEach((file) => formData.append("images", file));
      return;
    }

    if (key === "imageCover" && val instanceof File) {
      formData.append("imageCover", val);
      return;
    }

    if ((key === "guides" || key === "startDates") && Array.isArray(val)) {
      val.forEach((item) => formData.append(key, item));
      return;
    }

    if (typeof val === "object") {
      formData.append(key, JSON.stringify(val));
      return;
    }

    formData.append(key, val);
  });

  return formData;
}
