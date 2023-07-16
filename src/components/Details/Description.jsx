import { Typography } from "antd";
import React from "react";

const Description = ({ house }) => (
  <div className="mt-12">
    <Typography.Title level={3}>About this home</Typography.Title>
    <Typography.Paragraph>{house.description}</Typography.Paragraph>
  </div>
);

export default Description;
