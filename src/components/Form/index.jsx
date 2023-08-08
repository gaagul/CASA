import React, { useState } from "react";
import { Button } from "antd";
import { dec, inc } from "ramda";
import { Formik, Form as FormikForm } from "formik";
import { Container } from "@mui/material";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Steps from "./Steps";
import Basic from "./Basic";
import Assets from "./Assets";
import AdditionalInfo from "./AdditionalInfo";
import { PROPERTY_FORM_INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import { getFromLocalStorage } from "../../hooks/useLocalStorage";
import { createProperty, uploadImageAsset } from "../../apis/properties";
import { db } from "../../firebase";

const Form = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState({
    thumbnail: null,
    fileList: [],
    coverImage: null,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(inc);
    } else {
      // TODO: SUBMIT LOGIC
      setCurrentStep(0);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(dec);
    }
  };

  const handleAssetUpload = async createdPropertyRef => {
    console.log("createdPropertyRef", createdPropertyRef);
    // thumbnail image upload
    // console.log(assets);
    const thumbnailUrl = await uploadImageAsset(assets.thumbnail);

    updateDoc(
      doc(
        db,
        createdPropertyRef._key.path.segments[0],
        createdPropertyRef._key.path.segments[1]
      ),
      { thumbnailUrl }
    );

    // //Image List upload
    const imageList = [];
    for (const file of assets.fileList) {
      const imageUrl = await uploadImageAsset(file.originFileObj);
      console.log(imageUrl);
      imageList.push(imageUrl);
    }

    updateDoc(
      doc(
        db,
        createdPropertyRef._key.path.segments[0],
        createdPropertyRef._key.path.segments[1]
      ),
      { imageList }
    );
  };

  const handleSubmit = async formData => {
    const loggedInUser = JSON.parse(getFromLocalStorage("loggedInUser", null));
    if (!loggedInUser) {
      throw "Logged In User information not available!!!";
    }

    formData.userId = loggedInUser.uid;
    formData.status = "pending";
    formData.isFeatured = false;
    const createdPropertyRef = await createProperty(formData);
    await handleAssetUpload(createdPropertyRef);
    toast.success("Property created successfully, It is under review", {
      type: "success",
    });
    navigate("/listing");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Basic />;
      case 1:
        return <Assets assets={assets} setAssets={setAssets} />;
      case 2:
        return <AdditionalInfo />;
      default:
        return <Basic />;
    }
  };

  return (
    <Container className="mt-20 flex h-full w-full flex-col gap-8 px-60 pt-8">
      <Steps currentStep={currentStep} />
      <Formik
        initialValues={PROPERTY_FORM_INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            {renderCurrentStep()}
            <div className="mt-8 flex justify-end gap-6">
              <Button onClick={previousStep}>Previous</Button>
              {currentStep === 2 ? (
                <Button
                  disabled={isSubmitting}
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              ) : (
                <Button onClick={nextStep}>Next</Button>
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default Form;
