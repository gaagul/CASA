import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useSearchParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Header from "../components/MyAccount/Header";
import Table from "../components/MyAccount/Table";
import { PROPERTY_STATUS } from "../components/MyAccount/constants";
import { UserDetails } from "../components/MyAccount/UserDetails";

const MyAccount = () => {
  const [activeStatus, setActiveStatus] = useState(PROPERTY_STATUS[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const user = { name: null, email: null, photoURL: null };

  useEffect(() => {
    searchParams.get("keyword");

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("status", activeStatus.value);
    setSearchParams(newSearchParams);
  }, [activeStatus]);

  return (
    <Layout className="mt-12 min-h-screen w-screen">
      <div style={{ padding: 20 }}>
        <Layout className="px-4">
          <Title
            level={5}
            style={{ color: "#595959", fontWeight: "normal", marginTop: 20 }}
          >
            User Details
          </Title>
          <UserDetails />
          <Title
            level={5}
            style={{ color: "#595959", fontWeight: "normal", marginTop: 20 }}
          >
            User Properties
          </Title>
          <Header
            activeStatus={activeStatus}
            searchParams={searchParams}
            setActiveStatus={setActiveStatus}
            setSearchParams={setSearchParams}
          />
          <Table searchParams={searchParams} />
        </Layout>
      </div>
    </Layout>
  );
};
export default MyAccount;
