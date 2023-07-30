import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  useOutletContext,
  Link as RouterLink,
} from "react-router-dom";

import Link from "antd/es/typography/Link";
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

  if (userDetails.role !== "admin") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h1 className="text-4xl">You are not authorized to view this page</h1>
        <RouterLink to="/">
          <Link>Go back to home page</Link>
        </RouterLink>
      </div>
    );
  }

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
