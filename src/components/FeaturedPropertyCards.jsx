import React from "react";
import { Spin } from "antd";
import PropertyCard from "./PropertyCard";
import { useFetchFeaturedAssets } from "../hooks/usePropertiesApi";

const FeaturedPropertyCards = () => {
  const { data, status, error } = useFetchFeaturedAssets();
  console.log("Data", data);
  if (status === "loading") {
    return <Spin className="flex h-full w-full flex-col items-center justify-around"/>;
  }

  if (status === "error") {
    console.log("Error at fetching featured properties");
    console.log(error);
  }

  if(status === "success")
  return (
    <div className="mt-4 flex flex-grow flex-wrap justify-start gap-6">
      {data.map(property => (
        
          <PropertyCard property={property} />
        
      ))}
    </div>
  );
};

export default FeaturedPropertyCards;
