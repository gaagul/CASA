import React from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import Header from "../components/Details/Header";
import Assets from "../components/Details/Assets";
import SaleDetails from "../components/Details/SaleDetails";
import PropertyDetails from "../components/Details/PropertyDetails";
import Description from "../components/Details/Description";
import { useFetchPropertyById } from "../hooks/usePropertiesApi";
import { useFetchUserById } from "../hooks/useUsersApi";

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchPropertyById(id);
  const property = data?.data();
  const { data: userData } = useFetchUserById(property?.userId);

  if (isLoading) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <div className="mt-16 px-24 pb-10 pt-10">
      <Header house={property} />
      <div className="mt-8 flex max-h-96 justify-between gap-8">
        <Assets imageList={property?.imageList || []} />
        <SaleDetails house={property} ownerDetails={userData?.data()} />
      </div>
      <PropertyDetails house={property} />
      <Description house={property} />
    </div>
  );
};

export default Details;
