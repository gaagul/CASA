import React from "react";
import {
  SettingsOutlined,
  HomeOutlined,
  AssessmentOutlined,
} from "@mui/icons-material";

export const HOUSE = {
  id: "test-house-id",
  name: "Palm Harbor",
  address: "2699 Green Valley, Highland Lake, FL",
  zipcode: "670731",
  thumbnail:
    "https://ik.imagekit.io/gaagultest/CASA/house1?updatedAt=1685449331112",
  price: 1900,
  beds: 3,
  baths: 2,
  area: 200,
  forRent: true,
  favorite: false,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const ADMIN_OPTIONS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: () => <AssessmentOutlined />,
  },
  {
    key: "properties",
    label: "Properties",
    icon: () => <HomeOutlined />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: () => <SettingsOutlined />,
  },
];
