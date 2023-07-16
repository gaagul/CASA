import React from "react";
import PropertyCard from "./PropertyCard";

const TileGrid = () => {
  const numbers = [1, 2];

  return (
    <div className="flex w-full flex-wrap justify-start">
      {numbers.map(a => (
        <div className="mb-10  basis-1/4 gap-2" key={a}>
          <PropertyCard />
        </div>
      ))}
    </div>
  );
};

export default TileGrid;
