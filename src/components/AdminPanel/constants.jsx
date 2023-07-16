import React from "react";
import {
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  DesktopOutlined,
  CheckOutlined,
  MoreOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Tag, Dropdown } from "antd";
import { Link } from "react-router-dom";

export const getItem = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

export const PROPERTY_STATUS = [
  {
    key: "1",
    value: "pending",
    label: "Pending",
  },
  {
    key: "2",
    value: "approved",
    label: "Approved",
  },
  {
    key: "3",
    value: "rejected",
    label: "Rejected",
  },
];

export const items = [
  getItem(
    "Listings",
    "1",
    <Link to="/admin">
      <BarChartOutlined />
    </Link>
  ),
  getItem(
    "Option 2",
    "2",
    <Link to="/admin/option2">
      <DesktopOutlined />
    </Link>
  ),
  getItem(
    "Team",
    "3",
    <Link to="/admin/team">
      <TeamOutlined />
    </Link>
  ),
  getItem(
    "Settings",
    "4",
    <Link to="/admin/settings">
      <SettingOutlined />
    </Link>
  ),
];

export const TABLE_ACTIONS = [
  { label: "Approve", icon: <CheckOutlined /> },
  { label: "Reject", icon: <CloseCircleOutlined /> },
];

export const createTableActionsMenuItems = id =>
  TABLE_ACTIONS.map(({ label, icon }) => ({
    key: label,
    label,
    icon,
    onClick: () => console.log(`Clicked on ${label} for ${id}`),
  }));

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tag",
    render: (_, { tag }) => {
      const color = tag === "isRent" ? "geekblue" : "green";

      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, { key }) => (
      <Dropdown
        menu={{ items: createTableActionsMenuItems(key) }}
        trigger={["click"]}
      >
        <a onClick={e => e.preventDefault()}>
          <MoreOutlined />
        </a>
      </Dropdown>
    ),
  },
];
export const data = [
  {
    key: "1",
    name: "Villa 1",
    price: 32,
    address: "New York No. 1 Lake Park",
    tag: "isRent",
    status: "pending",
  },
  {
    key: "2",
    name: "Villa 2",
    price: 42,
    address: "London No. 1 Lake Park",
    tag: "isRent",
    status: "pending",
  },
  {
    key: "3",
    name: "Villa 3",
    price: 32,
    address: "Sydney No. 1 Lake Park",
    tag: "isRent",
    status: "pending",
  },
];
