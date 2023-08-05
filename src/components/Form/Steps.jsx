import React from "react";
import { Steps as AntSteps } from "antd";

const Steps = ({ currentStep }) => (
  <AntSteps
    current={currentStep}
    size="small"
    items={[
      {
        title: "Step 1",
      },
      {
        title: "Step 2",
      },
      {
        title: "Step 3",
      },
    ]}
  />
);

export default Steps;
