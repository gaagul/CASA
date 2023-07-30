import React from "react";
import { Menu, Layout } from "antd";
import { not } from "ramda";
import { useLocation } from "react-router-dom";
import { items } from "./constants";

const { Sider } = Layout;

const Sidebar = ({ isOpen, setIsOpen, userDetails }) => {
  const buildItems = () =>
    items.filter(item => {
      if (item.label === "Team" && userDetails?.role !== "admin") {
        return false;
      }

      return true;
    });

  const location = useLocation();

  const currentPathname = location.pathname;
  const defaultSelectedKey =
    items.find(item => currentPathname === item.path)?.key || "1";

  return (
    <Sider
      collapsible
      collapsed={not(isOpen)}
      onCollapse={value => setIsOpen(not(value))}
    >
      <div className="mt-16 flex h-16 w-full justify-around text-gray-100" />
      <Menu
        className="mt-4"
        defaultSelectedKeys={[defaultSelectedKey]}
        items={buildItems()}
        mode="inline"
        theme="dark"
      />
    </Sider>
  );
};
export default Sidebar;
