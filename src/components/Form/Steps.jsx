import React from "react";
import { Steps as AntSteps } from "antd";

const Steps = ({ currentStep }) => (
  <AntSteps
    current={currentStep}
    size="small"
    items={[
      {
        title: "Basic",
      },
      {
        title: "Assets",
      },
      {
        title: "Additional info",
      },
    ]}
  />
);

export default Steps;
