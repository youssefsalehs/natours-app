import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Formik } from "formik";

import { useState } from "react";

import { addTourvalidationSchema } from "../../constants/schemas";
import buildTourFormData from "../../utils/buildTourFormData";
import useGuides from "../../Hooks/useGuides";
import useAddTour from "../../Hooks/useAddTour";
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

export default function AddTour() {
  const [imageCoverPreview, setImageCoverPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { data: users } = useGuides();
  const addTourMutation = useAddTour();

  return (
    <Box sx={{ p: 2, mx: "auto" }}>
      <Formik
        initialValues={{
          name: "",
          duration: "",
          maxGroupSize: "",
          difficulty: "",
          price: "",
          priceDiscount: "",
          summary: "",
          description: "",
          imageCover: null,
          images: [],
          guides: [],
          startDates: [],
          startLocation: {
            address: "",
            description: "",
            coordinates: [],
          },
          locations: [
            {
              day: "1",
              address: "",
              description: "",
              coordinates: [],
            },
          ],
          secretTour: false,
        }}
        validationSchema={addTourvalidationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = buildTourFormData(values);
          addTourMutation.mutate(formData, {
            onSuccess: () => {
              resetForm();
              setImageCoverPreview(null);
              setImagesPreview([]);
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
              errors={errors}
              touched={touched}
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
              Add Tour
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}
