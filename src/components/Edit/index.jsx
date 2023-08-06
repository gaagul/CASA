import React from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import {
  useFetchPropertyById,
  // useFetchUserById,
} from "../../hooks/usePropertiesApi";
import EditForm from "./EditForm";

const Edit = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchPropertyById(id);
  const property = data?.data();
  // const { data: userData } = useFetchUserById(property?.userId);

  const handleSubmit = values => {
    console.log(values);
  };

  if (isLoading) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <div className="mt-16">
      <EditForm property={property} onSubmit={handleSubmit} />
    </div>
  );
};

export default Edit;
