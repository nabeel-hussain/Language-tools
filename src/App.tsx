import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import AppRoute from "./components/Core/AppRoute";
import MainHeader from "./components/Layout/MainHeader/Header";
import SideBar from "./components/Layout/SideBar/SideBar";
import MainFooter from "./components/Layout/Footer/MainFooter";
const { Content } = Layout;
const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <MainHeader></MainHeader>
        <Layout style={{minHeight:"100vh"}}>
          <SideBar ></SideBar>
          <Layout>
            <Content 
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
              <AppRoute />
            </Content>
            <MainFooter></MainFooter>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
