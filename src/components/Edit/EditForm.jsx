import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Typography, Button } from "antd";

const { Title } = Typography;

const PropertyForm = ({ property, onSubmit }) => {
  const { isFeatured, status, ...editableProperty } = property; // Exclude "isFeatured" and "status" from editableProperty

  return (
    <Formik
      initialValues={editableProperty}
      onSubmit={(values) => {
        // Handle the form submission here, you can call the onSubmit function passed as a prop
        onSubmit(values);
      }}
    >
      {({ values }) => (
        <Form className="rounded bg-white p-4 pb-8 shadow">
          <Title className="mb-4" level={2}>
            Edit Property
          </Title>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography.Text strong>Name</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="name"
                name="name"
                type="text"
              />
            </div>
            <div>
              <Typography.Text strong>Address</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="address"
                name="address"
                type="text"
              />
            </div>
            <div>
              <Typography.Text strong>Price</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="price"
                name="price"
                type="text"
              />
            </div>
            <div>
              <Typography.Text strong>Amenities</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="amenities"
                name="amenities"
                type="text"
              />
            </div>
            <div>
              <Typography.Text strong>Number of Bathrooms</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="bathrooms"
                name="bathrooms"
                type="number"
              />
            </div>
            <div>
              <Typography.Text strong>Area (sq m)</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="area"
                name="area"
                type="number"
              />
            </div>
            <div className="col-span-2">
              <Typography.Text strong>Description</Typography.Text>
              <Field
                as="textarea"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="description"
                name="description"
                type="text"
              />
            </div>
            <div className="col-span-2">
              <Typography.Text strong>Thumbnail URL</Typography.Text>
              <Field
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                id="thumbnailUrl"
                name="thumbnailUrl"
                type="text"
              />
            </div>
            <div className="col-span-2">
              <Typography.Text strong>Image List</Typography.Text>
              <FieldArray name="imageList">
                {({ push, remove }) => (
                  <div>
                    {values.imageList.map((image, index) => (
                      <div className="image-field mb-2" key={index}>
                        <div
                          className="square-image"
                          style={{
                            width: "100px", // Set your desired square size here
                            height: "100px", // Set your desired square size here
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <img
                            alt={`Image ${index + 1}`}
                            src={image}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          />
                        </div>
                        <Button
                          danger
                          className="ml-2"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="mt-2"
                      type="button"
                      onClick={() => push("")}
                    >
                      Add Image
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
          </div>
          <Button className="mt-4" htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyForm;
