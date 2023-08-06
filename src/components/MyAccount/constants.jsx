import React from "react";
import {
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  DesktopOutlined,
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AntdLink from "antd/es/typography/Link";
import { Tag, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { deletePropertyById } from "../../apis/properties";

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
  { label: "Delete", icon: <DeleteOutlined /> },
  { label: "Edit", icon: <EditOutlined />, isEdit: true },
];

export const createTableActionsMenuItems = (
  id,
  deleteCallback,
  navigateToEditPage
) =>
  TABLE_ACTIONS.map(({ label, icon, isEdit }) => ({
    key: label,
    label,
    icon,
    onClick: async () => {
      if (isEdit) {
        // If isEdit is true, navigate to the edit page
        navigateToEditPage(id);
      } else {
        // Otherwise, perform the delete operation
        await deletePropertyById(id);
        deleteCallback();
      }
    },
  }));

export const buildColumns = (deleteCallback, navigateToEditPage) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { id, name }) => (
      <AntdLink>
        <Link target="_blank" to={`/listing/${id}`}>
          {name}
        </Link>
      </AntdLink>
    ),
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
        trigger={["click"]}
        menu={{
          items: createTableActionsMenuItems(
            id,
            deleteCallback,
            navigateToEditPage
          ),
        }}
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
