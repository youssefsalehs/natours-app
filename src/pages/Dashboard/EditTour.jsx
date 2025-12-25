import { Box, Button, FormControlLabel, Checkbox } from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { editTourValidationSchema } from "../../constants/schemas";

import useGuides from "../../Hooks/useGuides";
import useFetchTour from "../../Hooks/useFetchTour";
import useUpdateTour from "../../Hooks/useUpdateTour";

import BasicInfo from "../../components/AddTourComp/BasicInfo";
import Pricing from "../../components/AddTourComp/Pricing";
import StartDates from "../../components/AddTourComp/StartDates";
import GuidesSelect from "../../components/AddTourComp/GuidesSelect";
import SummaryDescription from "../../components/AddTourComp/SummaryDescription";
import StartLocation from "../../components/AddTourComp/StartLocation";
import Locations from "../../components/AddTourComp/Locations";
import ImageCoverUploader from "../../components/AddTourComp/ImageCoverUploader";
import ImagesUploader from "../../components/AddTourComp/ImagesUploader";
import GroupSizeDifficulty from "../../components/AddTourComp/GroupSizeDifficulty";
function normalizeLocations(locations) {
  return locations.map((loc, index) => ({
    type: "Point",
    coordinates: loc.coordinates || [0, 0],
    description: loc.description || `Day ${loc.day || index + 1}`,
    day: loc.day || index + 1,
    address: loc.address || "",
    ...(loc._id && { _id: loc._id }),
  }));
}

export default function EditTour() {
  const { id } = useParams();
  const { data: tourRes, isLoading } = useFetchTour(id);
  const { data: users } = useGuides();
  let tour = tourRes?.data?.data || {};
  const updateTourMutation = useUpdateTour(id);

  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (tour) {
      setImageCoverPreview(tour?.imageCover?.url || null);
      setImagesPreview(tour?.images?.map((img) => img.url) || []);
    }
  }, [tour]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 2, mx: "auto" }}>
      <Formik
        initialValues={{
          name: tour.name || "",
          duration: tour.duration || "",
          price: tour.price || "",
          priceDiscount: tour.priceDiscount || "",
          summary: tour.summary || "",
          description: tour.description || "",
          difficulty: tour.difficulty || "",
          maxGroupSize: tour.maxGroupSize || 0,
          secretTour: tour.secretTour || false,
          guides: tour.guides.map((g) => g.id) || [],
          startDates: tour.startDates || [],
          locations: tour.locations || [],
          startLocation: tour.startLocation || {},
          imageCover: null,
          images: [],
        }}
        validationSchema={editTourValidationSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("duration", values.duration);
          formData.append("price", values.price);
          formData.append("summary", values.summary);
          formData.append("difficulty", values.difficulty);
          formData.append("maxGroupSize", values.maxGroupSize);
          formData.append("description", values.description);
          formData.append("secretTour", values.secretTour);
          if (values.priceDiscount)
            formData.append("priceDiscount", values.priceDiscount);
          formData.append("guides", JSON.stringify(values.guides));
          formData.append("startDates", JSON.stringify(values.startDates));
          formData.append(
            "locations",
            JSON.stringify(normalizeLocations(values.locations))
          );
          formData.append(
            "startLocation",
            JSON.stringify(values.startLocation)
          );

          if (values.imageCover)
            formData.append("imageCover", values.imageCover);
          if (values.images && values.images.length > 0) {
            for (let i = 0; i < values.images.length; i++) {
              formData.append("images", values.images[i]);
            }
          }

          updateTourMutation.mutate(formData, {
            onSuccess: () => {
              alert("Tour updated successfully!");
            },
            onError: (err) => {
              console.error("Update failed:", err);
            },
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <BasicInfo
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <GroupSizeDifficulty
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <Pricing
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <SummaryDescription
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
            />
            <GuidesSelect
              values={values}
              touched={touched}
              errors={errors}
              users={users}
              handleChange={handleChange}
            />
            <StartDates values={values} setFieldValue={setFieldValue} />
            <StartLocation
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
            <Locations values={values} setFieldValue={setFieldValue} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.secretTour}
                  onChange={(e) =>
                    setFieldValue("secretTour", e.target.checked)
                  }
                />
              }
              label="Secret Tour"
              sx={{ mb: 2 }}
            />
            <ImageCoverUploader
              setFieldValue={setFieldValue}
              imageCoverPreview={imageCoverPreview}
              setImageCoverPreview={setImageCoverPreview}
            />
            <ImagesUploader
              setFieldValue={setFieldValue}
              imagesPreview={imagesPreview}
              setImagesPreview={setImagesPreview}
            />
            <Button variant="contained" type="submit" sx={{ mb: 2 }}>
              Update Tour
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
