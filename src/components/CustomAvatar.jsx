import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../hooks/useLocalStorage";

const items = [
  {
    key: "AddListing",
    label: <Link to="/add">Add Listing</Link>,
  },
  {
    key: "AdminDashboard",
    label: <Link to="/admin">Admin Dashboard</Link>,
    disabled: !(
      JSON.parse(
        getFromLocalStorage("loggedInUser")
          ? getFromLocalStorage("loggedInUser")
          : '{"role":"standard"}'
      ).role === "admin" ||
      JSON.parse(
        getFromLocalStorage("loggedInUser")
          ? getFromLocalStorage("loggedInUser")
          : '{"role":"standard"}'
      ).role === "moderator"
    ),
  },
  {
    key: "MyAccount",
    label: <Link to="/account">My Account</Link>,
  },
  {
    key: "Logout",
    danger: true,
    label: "Logout",
  },
];

const AvatarMenu = () => {
  const invokeGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        removeFromLocalStorage("isLoggedIn");
        removeFromLocalStorage("loggedInUser");
        window.location.href = "/";
      })
      .catch(error => {
        console.log(`An error happened. Here's the error: ${error}`);
      });
  };

  const handleDropdownItemClick = event => {
    if (event.key === "Logout") {
      invokeGoogleSignOut();
    }
  };

  return (
    <Dropdown
      className="z-50"
      menu={{ onClick: handleDropdownItemClick, items }}
      trigger={["click"]}
    >
      <UserOutlined />
    </Dropdown>
  );
};
export default AvatarMenu;
