import React from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Tabs, Input, Button } from "antd";
import { isEmpty } from "ramda";
import { PROPERTY_STATUS } from "./constants";

const { Header } = Layout;
const { Search } = Input;

const AntdHeader = ({
  activeStatus,
  setActiveStatus,
  searchParams,
  setSearchParams,
}) => (
  <Header className="mt-2 flex items-center justify-between bg-white rounded-lg">
    <div className="flex items-center gap-4">
      <Button
        className="-ml-10"
        icon={<MenuUnfoldOutlined />}
        type="secondary"
      />
      <Tabs
        defaultActiveKey={activeStatus.key}
        items={PROPERTY_STATUS}
        size="small"
        onChange={key => {
          setActiveStatus(PROPERTY_STATUS.find(obj => obj.key === key));
        }}
      />
    </div>
    <Search
      allowClear
      className="w-60"
      placeholder="Search name"
      onChange={e => {
        if (isEmpty(e.target.value)) {
          searchParams.delete("keyword");
          setSearchParams(searchParams);

          return;
        }
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("keyword", e.target.value);
        setSearchParams(newSearchParams);
      }}
    />
  </Header>
);

export default AntdHeader;
