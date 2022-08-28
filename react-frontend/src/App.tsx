import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import AppRoute from "./components/Core/AppRoute";
import MainHeader from "./components/Layout/MainHeader/Header";
import SideBar from "./components/Layout/SideBar/SideBar";
import MainFooter from "./components/Layout/Footer/MainFooter";

import { getToken } from "./Api/authentication";
import { emitWarning } from "process";
import backend from "./Api/backend";
const { Content } = Layout;

const App = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      getToken({
          username: "lang_tools",
          password: "VeDJvcvB0uiQ1Hd",
        });
    }else{
      backend.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem("jwtToken");
    }
  });
  return (
    <BrowserRouter>
      <Layout>
        <MainHeader></MainHeader>
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar></SideBar>
          <Layout>
            <Content
              style={{
                padding: "0px",
                margin: "0px",
                minHeight: 280,
                background: "white",
              }}
            >
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
