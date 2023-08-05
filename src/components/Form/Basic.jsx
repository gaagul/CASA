import React from "react";
import { Field, ErrorMessage } from "formik";
import { Typography } from "antd";

const { Title } = Typography;

const Basic = () => (
  <div className="rounded bg-white p-4 pb-8 shadow">
    <Title className="mb-4" level={2}>
      Step 1
    </Title>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="name"
        >
          Name
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="name"
          name="name"
          type="text"
        />
        <ErrorMessage
          name="name"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="address"
        >
          Address
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="address"
          name="address"
          type="text"
        />
        <ErrorMessage
          name="address"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="zipcode"
        >
          Zip Code
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="zipcode"
          name="zipcode"
          type="text"
        />
        <ErrorMessage
          name="zipcode"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="bedrooms"
        >
          Number of Bedrooms
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="bedrooms"
          name="bedrooms"
          type="number"
        />
        <ErrorMessage
          name="bedrooms"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="bathrooms"
        >
          Number of Bathrooms
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="bathrooms"
          name="bathrooms"
          type="number"
        />
        <ErrorMessage
          name="bathrooms"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
      <div>
        <Typography
          className="mb-2 block font-semibold text-gray-700"
          htmlFor="area"
        >
          Area (sq m)
        </Typography>
        <Field
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          id="area"
          name="area"
          type="number"
        />
        <ErrorMessage
          name="area"
          render={msg => <div className="error">{msg}</div>}
        />
      </div>
    </div>
  </div>
);

export default Basic;
