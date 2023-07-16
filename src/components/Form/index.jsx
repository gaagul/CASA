import React, { useState } from "react";
import { Button } from "antd";
import { dec, inc } from "ramda";
import { Formik, Form as FormikForm } from "formik";
import { Container } from "@mui/material";
import Steps from "./Steps";
import Basic from "./Basic";
import Assets from "./Assets";
import AdditionalInfo from "./AdditionalInfo";
import { PROPERTY_FORM_INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

const Form = () => {
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
    <Container className="mt-12 flex h-full w-full flex-col gap-8 px-60 pt-8">
      <Steps currentStep={currentStep} />
      <Formik
        initialValues={PROPERTY_FORM_INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            {renderCurrentStep()}
            <div className="mt-8 flex justify-end gap-6">
              <Button onClick={previousStep}>Previous</Button>
              {currentStep === 2 ? (
                <Button loading={isSubmitting} type="submit" onClick={nextStep}>
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
