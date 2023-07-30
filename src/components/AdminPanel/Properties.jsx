import React, { useEffect, useState } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";

import { PROPERTY_STATUS } from "./constants";
import Header from "./Header";
import Table from "./PropertiesTable";

const Properties = () => {
  const [activeStatus, setActiveStatus] = useState(PROPERTY_STATUS[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userDetails = {} } = useOutletContext();

  useEffect(() => {
    searchParams.get("keyword");

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("status", activeStatus.value);
    setSearchParams(newSearchParams);
  }, [activeStatus]);

  return (
    <>
      <Header
        activeStatus={activeStatus}
        searchParams={searchParams}
        setActiveStatus={setActiveStatus}
        setSearchParams={setSearchParams}
        tabItems={PROPERTY_STATUS}
      />
      <Table searchParams={searchParams} userDetails={userDetails} />
    </>
  );
};

export default Properties;
