import React ,{useState}from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { MenuItem } from "../../../Models/MenuItem";
import { Link } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png"

const SubMenu = Menu.SubMenu;
//const MenuItems: MenuItem[] = require("../Data/menu.json");
const { Header, Content, Sider } = Layout;
const MenuItems: MenuItem[] = require("../../../Data/menu.json");

const MainHeader = () => {
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
  return (
    <>
        <Header className="light-background">
          <div className="logo">
            <img className="logo-img" src={logo}></img>
          </div>
          {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]}>
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
          </Menu> */}
        </Header>
    </>
  );
};
export default MainHeader;
