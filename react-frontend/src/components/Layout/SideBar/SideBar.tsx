import  { useState } from "react";

import {  Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const {  Sider } = Layout;
const MenuItems: MenuItem[] = require("../../../Data/menu.json");

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  //Function to render the subitems.
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
  //This will set the selected item if page is reloaded inside a particular sub path. 
  let defaultKey = window.location.pathname.includes("translation")
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
              <Menu.Item key={index}>
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
