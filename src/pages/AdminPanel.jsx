import React, { useState } from "react";
import { Layout, Spin } from "antd";
import { Outlet, Link } from "react-router-dom";
import AntdLink from "antd/es/typography/Link";
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
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h1 className="text-4xl">You are not authorized to view this page</h1>
        <AntdLink>
          <Link to="/">Go back to home page</Link>
        </AntdLink>
      </div>
    );
  }

  if (userDetails?.role === "standard") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        <h1 className="text-4xl">You are not authorized to view this page</h1>
        <AntdLink>
          <Link to="/">Go back to home page</Link>
        </AntdLink>
      </div>
    );
  }

  return (
    <Layout className="mt-12 min-h-screen w-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userDetails={userDetails}
      />
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
