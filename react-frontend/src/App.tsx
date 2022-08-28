import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import AppRoute from "./components/Core/AppRoute";
import MainHeader from "./components/Layout/MainHeader";
import SideBar from "./components/Layout/SideBar";
import MainFooter from "./components/Layout/Footer";

import { getToken } from "./Api/authentication";
import { emitWarning } from "process";
import backend from "./Api/backend";
import config from "./Shared/config";
const { Content } = Layout;

const App = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("jwtToken")) {
      getToken({
          username: config.username,
          password: config.password,
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
