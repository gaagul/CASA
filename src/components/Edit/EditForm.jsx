import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Typography, Button, Upload, Image } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { updatePropertyById, uploadImageAsset } from "../../apis/properties";

const { Title } = Typography;

const PropertyForm = ({ property, onSubmit }) => {
  const navigate = useNavigate();
  const { isFeatured, status, ...editableProperty } = property; // Exclude "isFeatured" and "status" from editableProperty
  const location = useLocation();
  const [assets, setAssets] = useState({ thumbnail: null, fileList: [] });
  console.log(editableProperty);
  console.log(assets);

  const assetsUploadProps = {
    onRemove: file => {
      const index = assets.fileList.indexOf(file);
      const newFileList = assets.fileList.slice();
      newFileList.splice(index, 1);
      setAssets(prevState => ({ ...prevState, fileList: newFileList }));
    },
    beforeUpload: () => false,
    onChange: ({ fileList: newFileList }) => {
      console.log(assets);
      setAssets(prevAssets => ({
        ...prevAssets,
        fileList: newFileList.slice(0, 8),
      }));
    },
    fileList: assets.fileList,
  };

  const coverUploadProps = {
    beforeUpload: () => false,
    onChange: ({ file }) => {
      if (file?.status === "removed") {
        setAssets(prevState => ({ ...prevState, thumbnail: null }));
      } else {
        setAssets(prevState => ({ ...prevState, thumbnail: file }));
      }
    },
  };

  const uploadButton = () => (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleNewImageAssetsUpload = async () => {
    let thumbnailUrl = null;
    if (assets.thumbnail) {
      thumbnailUrl = await uploadImageAsset(assets.thumbnail);
    }
    const imageList = [];
    for (const file of assets.fileList) {
      const imageUrl = await uploadImageAsset(file.originFileObj);
      console.log(imageUrl);
      imageList.push(imageUrl);
    }

    return { thumbnailUrl, imageList };
  };

  return (
    <Formik
      initialValues={editableProperty}
      onSubmit={async values => {
        // Handle the form submission here, you can call the onSubmit function passed as a prop
        const imageLinks = await handleNewImageAssetsUpload();
        if (imageLinks.thumbnailUrl) {
          values.thumbnailUrl = imageLinks.thumbnailUrl;
        }
        values.imageList.push(...imageLinks.imageList);
        const propertyId = location.pathname.replace("/edit/", "");
        updatePropertyById(propertyId, values);

        navigate("/account");
        // onSubmit(values);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="rounded bg-white p-4 pb-8 shadow">
          <div className="centering-wrapper">
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
              <div className="flex flex-col gap-2">
                <Typography>Cover Image</Typography>
                <Upload.Dragger className="max-w-xs" {...coverUploadProps}>
                  {editableProperty.thumbnailUrl ? (
                    <img
                      alt="alternate"
                      src={
                        assets.thumbnail
                          ? URL.createObjectURL(assets.thumbnail)
                          : editableProperty.thumbnailUrl
                      }
                    />
                  ) : (
                    uploadButton()
                  )}
                </Upload.Dragger>
              </div>
              <div className="col-span-2" style={{ marginTop: "50px" }}>
                <FieldArray name="imageList">
                  {({ remove }) => (
                    <div style={{ display: "flex" }}>
                      {values.imageList.map((image, index) => (
                        <div
                          className="image-field"
                          key={index}
                          style={{ textAlign: "center", margin: "10px" }}
                        >
                          <div
                            className="square-image"
                            style={{
                              width: "100px", // Set your desired square size here
                              height: "100px", // Set your desired square size here
                              overflow: "hidden",
                              position: "relative",
                              borderRadius: "8px",
                            }}
                          >
                            <Image
                              alt={`Image ${index + 1}`}
                              height={100}
                              src={image}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            type="text"
                            style={{
                              height: "3em",
                              width: "3em",
                              margin: "5px",
                            }}
                            onClick={() => remove(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
                <Upload multiple listType="picture-card" {...assetsUploadProps}>
                  {assets.fileList.length >= 8 ? null : uploadButton()}
                </Upload>
              </div>
            </div>
            <Button className="mt-4" htmlType="submit" type="primary" disabled={isSubmitting} loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyForm;
