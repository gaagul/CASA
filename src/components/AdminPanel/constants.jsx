import React from "react";
import {
  BarChartOutlined,
  TeamOutlined,
  CheckOutlined,
  MoreOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Tag, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { setPropertyStatus } from "../../apis/properties";
import { updateUserRole } from "../../apis/users";

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

export const USER_STATUS = [
  {
    key: 1,
    value: "standard",
    label: "Standard",
  },
  {
    key: 2,
    value: "moderator",
    label: "Moderator",
  },
  {
    key: 3,
    value: "admin",
    label: "Admin",
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
    "Team",
    "3",
    <Link to="/admin/members">
      <TeamOutlined />
    </Link>
  ),
  // getItem(
  //   "Settings",
  //   "4",
  //   <Link to="/admin/settings">
  //     <SettingOutlined />
  //   </Link>
  // ),
];

export const TABLE_ACTIONS = [
  { label: "Approve", icon: <CheckOutlined /> },
  { label: "Reject", icon: <CloseCircleOutlined /> },
];

export const createTableActionsMenuItems = (id, statusChangeCallback) =>
  TABLE_ACTIONS.map(({ label, icon }) => ({
    key: label,
    label,
    icon,
    onClick: () => setPropertyStatus(id, label, statusChangeCallback),
  }));

export const buildPropertiesColumns = statusChangeCallback => [
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
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Tags",
    key: "type",
    dataIndex: "type",
    render: (_, { type }) => {
      const color = type === "rent" ? "geekblue" : "green";

      return (
        <Tag color={color} key={type}>
          {type.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, { id }) => (
      <Dropdown
        menu={{ items: createTableActionsMenuItems(id, statusChangeCallback) }}
        trigger={["click"]}
      >
        <a onClick={e => e.preventDefault()}>
          <MoreOutlined />
        </a>
      </Dropdown>
    ),
  },
];

export const USER_ACTIONS = [
  { label: "Standard", value: "standard" },
  { label: "Moderator", value: "moderator" },
  { label: "Admin", value: "admin" },
];

export const createUserAction = (id, successCallback) =>
  USER_ACTIONS.map(({ label, value }) => ({
    key: label,
    label,
    onClick: () => updateUserRole(id, value, successCallback),
  }));

export const buildUsersColumns = successCallback => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, { id }) => (
      <Dropdown
        menu={{ items: createUserAction(id, successCallback) }}
        trigger={["click"]}
      >
        <a onClick={e => e.preventDefault()}>
          <MoreOutlined />
        </a>
      </Dropdown>
    ),
  },
];

export const properties = [
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
