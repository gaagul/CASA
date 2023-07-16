import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: <Link to="/add">Add Listing</Link>,
  },
  {
    key: "2",
    label: <Link to="/admin">Admin Dashboard</Link>,
    disabled: true,
  },
  {
    key: "3",
    label: <Link to="/account">My Account</Link>,
  },
  {
    key: "4",
    danger: true,
    label: "Logout",
  },
];

const AvatarMenu = () => (
  <Dropdown className="z-50" menu={{ items }} trigger={["click"]}>
    <UserOutlined />
  </Dropdown>
);
export default AvatarMenu;
