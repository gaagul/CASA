import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Details/Header";
import { HOUSE } from "../components/constants";
import Assets from "../components/Details/Assets";
import SaleDetails from "../components/Details/SaleDetails";
import PropertyDetails from "../components/Details/PropertyDetails";
import Description from "../components/Details/Description";

const Details = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [house, setHouse] = useState(HOUSE);

  useEffect(() => {
    // if (!id) {
    //   navigate("/");
    // }
    // TODO: fetch house by id
    setHouse(HOUSE);
  }, [id]);

  return (
    <div className="mt-16 px-24 pb-10 pt-10">
      <Header house={HOUSE} />
      <div className="mt-8 flex max-h-96 justify-between gap-8">
        <Assets house={HOUSE} />
        <SaleDetails house={HOUSE} />
      </div>
      <PropertyDetails house={HOUSE} />
      <Description house={HOUSE} />
    </div>
  );
};

export default Details;
