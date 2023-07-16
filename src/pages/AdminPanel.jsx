import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/AdminPanel/Sidebar";
import Header from "../components/AdminPanel/Header";
import Table from "../components/AdminPanel/Table";
import { PROPERTY_STATUS } from "../components/AdminPanel/constants";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(PROPERTY_STATUS[0]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.get("keyword");

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("status", activeStatus.value);
    setSearchParams(newSearchParams);
  }, [activeStatus]);

  return (
    <Layout className="mt-12 min-h-screen w-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Layout className="px-4">
        <Header
          activeStatus={activeStatus}
          searchParams={searchParams}
          setActiveStatus={setActiveStatus}
          setSearchParams={setSearchParams}
        />
        <Table searchParams={searchParams} />
      </Layout>
    </Layout>
  );
};
export default AdminPanel;
