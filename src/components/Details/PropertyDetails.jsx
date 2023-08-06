import React from "react";
import { Typography } from "antd";
import {
  BedOutlined,
  BathroomOutlined,
  AspectRatioOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";

const PropertyDetails = ({ house }) => (
  <div className="mt-8 flex gap-8 rounded-lg border-2">
    <div className="flex flex-col gap-2 p-4">
      <Typography.Text>Bedrooms</Typography.Text>
      <div className="flex items-center gap-2">
        <BedOutlined className="primary-text" />
        <Typography.Text className="primary-text">{house.bedrooms}</Typography.Text>
      </div>
    </div>
    <div className="flex flex-col gap-2 p-4">
      <Typography.Text>Bathrooms</Typography.Text>
      <div className="flex items-center gap-2">
        <BathroomOutlined className="primary-text" />
        <Typography.Text className="primary-text">
          {house.bathrooms}
        </Typography.Text>
      </div>
    </div>
    <div className="flex flex-col gap-2 p-4">
      <Typography.Text>Square Area</Typography.Text>
      <div className="flex items-center gap-2">
        <AspectRatioOutlined className="primary-text" />
        <Typography.Text className="primary-text">
          {`${house.area} m2`}
        </Typography.Text>
      </div>
    </div>
    <div className="flex flex-col gap-2 p-4">
      <Typography.Text>Status</Typography.Text>
      <div className="flex items-center gap-2">
        <CheckCircleOutlined className="primary-text" />
        <Typography.Text className="primary-text">Active</Typography.Text>
      </div>
    </div>
  </div>
);

export default PropertyDetails;
