import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/AdminPanel/Sidebar";
import Header from "../components/AdminPanel/Header";
import Table from "../components/AdminPanel/Table";
import { PROPERTY_STATUS } from "../components/AdminPanel/constants";

const MyAccount = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout className="mt-12 min-h-screen w-screen">
      
        <Table searchParams={searchParams} />
    </Layout>
  );
};
export default MyAccount;
