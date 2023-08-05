import React from "react";
import { Typography, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Assets = ({ assets, setAssets }) => {
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.thumbURL = reader.result;
          console.log(reader.result);
        };

        reader.onerror = function (error) {
          console.log("Error in base64 conversion of image: ", error);
        };
        setAssets(prevState => ({ ...prevState, thumbnail: file }));
      }
    },
  };

  return (
    <div className="rounded bg-white p-4 pb-8 shadow">
      <Title className="mb-4" level={2}>
        Step 2
      </Title>
      <div className="flex flex-col gap-2 p-4">
        <Typography>Cover Image</Typography>
        <Upload.Dragger className="max-w-xs" {...coverUploadProps}>
          {assets.thumbnail ? (
            <img alt="alternate" src={URL.createObjectURL(assets.thumbnail)} />
          ) : (
            uploadButton()
          )}
        </Upload.Dragger>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Typography>Images</Typography>
        <Upload multiple listType="picture-card" {...assetsUploadProps}>
          {assets.fileList.length >= 8 ? null : uploadButton()}
        </Upload>
      </div>
    </div>
  );
};

export default Assets;
