import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { MenuItem } from "../../../Models/MenuItem";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
//const MenuItems: MenuItem[] = require("../Data/menu.json");
const { Header, Content, Sider } = Layout;
const MenuItems: MenuItem[] = require("../../../Data/menu.json");

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const renderChildItems = (item: MenuItem) => {
    return (
      <>
        <SubMenu
          key={item.name}
          title={<Link to={item.path}>{item.name}</Link>}
        >
          {item.subMenu &&
            item.subMenu.map((item, index) => (
              <Menu.Item key={`${item.name}:${index}`}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            ))}
        </SubMenu>
      </>
    );
  };
  const handleMenuItemClick = (name: string) => {
    setSelectedItem(name);
  };
 let defaultKey =  window.location.pathname.includes("translation")
    ? "1"
    : window.location.pathname.includes("spell")
    ? "2"
    : "0";
  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultKey]}>
          {MenuItems.map((item, index) =>
            item.subMenu && item.subMenu.length > 0 ? (
              renderChildItems(item)
            ) : (
              <Menu.Item
                //onClick={() => handleMenuItemClick(item.name)}

                key={index}
              >
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </>
  );
};
export default SideBar;
