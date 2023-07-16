import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { Spin } from "antd";
import PropertyCard from "./PropertyCard";
import { useFetchFeaturedAssets } from "../hooks/usePropertiesApi";
import { db } from "../firebase";

const fetchFeaturedProperties = async () =>
  await getDocs(collection(db, "properties"));

const FeaturedPropertyCards = () => {
  const numbers = [1, 2, 3, 4];
  const array = [];

  const { data, status, error } = useFetchFeaturedAssets();
  if (status === "loading") {
    return <Spin />;
  }

  if (status === "error") {
    console.log("Error at fetching featured properties");
    console.log(error);
  }

  data.docs.forEach(property => {
    array.push(property.data());
  });

  return (
    <div className="flex w-full flex-wrap justify-between">
      {array.map(property => (
        <div className="mb-10  basis-1/4 gap-2">
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedPropertyCards;
