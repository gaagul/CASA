import React, { useEffect, useState } from "react";
import { useSearchParams, useOutletContext } from "react-router-dom";

import { USER_STATUS } from "./constants";
import Header from "./Header";
import MembersTable from "./MembersTable";

const Members = () => {
  const [activeStatus, setActiveStatus] = useState(USER_STATUS[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userDetails = {} } = useOutletContext();

  useEffect(() => {
    searchParams.get("keyword");

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("role", activeStatus.value);
    setSearchParams(newSearchParams);
  }, [activeStatus]);

  return (
    <>
      <Header
        activeStatus={activeStatus}
        searchParams={searchParams}
        setActiveStatus={setActiveStatus}
        setSearchParams={setSearchParams}
        tabItems={USER_STATUS}
      />
      <MembersTable searchParams={searchParams} userDetails={userDetails} />
    </>
  );
};

export default Members;
