import React from "react";
import { Typography, Button } from "antd";

const SaleDetails = ({ house }) => (
  <div className="flex w-1/3 flex-col justify-between rounded-lg border-2 p-8">
    <div>
      <Typography.Text className="flex flex-col">
        {house.forRent ? "Rent Price: " : "Sale Price:"}
      </Typography.Text>
      <Typography.Title className="primary-text mt-2" level={3}>
        {`$${house.price}${house.forRent ? " /month" : ""}`}
      </Typography.Title>
    </div>
    <div className="flex flex-col">
      <Typography.Text>Contact Details:</Typography.Text>
      <Typography.Text className="primary-text mt-2">
        Email: {house.email}
      </Typography.Text>
      <Typography.Text className="primary-text mt-2">
        Phone: {house.phone}
      </Typography.Text>
    </div>
    <div>
      <Typography.Text className="mt-4">Need Assistance ?</Typography.Text>
      <Button
        disabled
        className="primary-button-bg ml-4 mt-4 self-center"
        type="primary"
      >
        Contact Agent
      </Button>
    </div>
  </div>
);

export default SaleDetails;
