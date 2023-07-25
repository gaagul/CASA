import React from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import { Typography, Switch } from "antd";
import classNames from "classnames";

const { Title } = Typography;

const AdditionalInfo = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleTypeChange = checked => {
    const newType = checked ? "rent" : "sale";
    setFieldValue("type", newType);
  };

  return (
    <div className="rounded bg-white p-4 pb-8 shadow">
      <Title className="mb-4" level={2}>
        Additional information
      </Title>
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex items-center gap-16">
          <div>
            <Typography
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="price"
            >
              Price{" "}
              <Typography className="inline font-normal">
                {values.type === "rent" ? "(Per Month)" : "(On Sale)"}
              </Typography>
            </Typography>
            <Field
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              id="price"
              name="price"
              type="text"
            />
            <ErrorMessage
              name="price"
              render={msg => <div className="error">{msg}</div>}
            />
          </div>
          <div className="mb-4 items-center">
            <Typography
              className="mr-2 font-semibold text-gray-700"
              htmlFor="type"
            >
              Type:{" "}
              <Typography className="inline font-normal">
                {values.type}
              </Typography>
            </Typography>
            <Field
              as={Switch}
              checked={values.type === "rent"}
              id="type"
              name="type"
              className={classNames("mt-2", {
                "bg-blue-500": values.type === "rent",
                "bg-gray-300": values.type === "sale",
              })}
              onChange={handleTypeChange}
            />
            <ErrorMessage
              name="=type"
              render={msg => <div className="error">{msg}</div>}
            />
          </div>
        </div>
        <div>
          <Typography
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="amenities"
          >
            <Typography className="inline font-normal">
              (separate by comma)
            </Typography>
          </Typography>
          <Field
            className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            id="amenities"
            name="amenities"
            type="text"
          />
          <ErrorMessage
            name="amenities"
            render={msg => <div className="error">{msg}</div>}
          />
        </div>
        <div>
          <Typography
            className="mb-2 block font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </Typography>
          <Field
            as="textarea"
            className="h-40 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            id="description"
            name="description"
            type="text"
          />
          <ErrorMessage
            name="description"
            render={msg => <div className="error">{msg}</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
