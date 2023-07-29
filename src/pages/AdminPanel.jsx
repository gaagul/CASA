import React, { useState } from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { isEmpty } from "ramda";
import { useUser } from "../hooks/useUser";
import Sidebar from "../components/AdminPanel/Sidebar";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isLoading, userDetails } = useUser();

  if (isLoading) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  if (isEmpty(userDetails)) {
    return <div className="mt-16">YOU ARE UNAUTHORIZED</div>;
  }

  // if (userDetails?.role === "standard") {
  //   return <div className="mt-16">YOU ARE UNAUTHORIZED</div>;
  // }

  return (
    <Layout className="mt-12 min-h-screen w-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Layout className="px-4">
        <Outlet
          context={{
            userDetails,
          }}
        />
      </Layout>
    </Layout>
  );
};
export default AdminPanel;
