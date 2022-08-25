import { MenuItem } from "../../../Models/MenuItem";
import React, { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { JsxElement } from "typescript";
import path from "path";
import { Users, Home, Blogs, AboutUs } from "../../../Pages";

const MenuItems: MenuItem[] = require("../../../Data/menu.json");
interface Registry {
  Key: string;
  Component: ReactNode;
}
const componentRegistry: Registry[] = [
  { Key: "Home", Component: <Home /> },
  { Key: "Blogs", Component: <Blogs /> },
  { Key: "Users", Component: <Users /> },
  { Key: "AboutUs", Component: <AboutUs /> },
];

const AppRoute = () => {
  return (
    <>
      <Routes>
        {MenuItems.map((item) => (
          <Route
            path={item.path}
            element={
              componentRegistry.filter((x) => x.Key === item.component)[0]
                .Component
            }
          ></Route>
        ))}
      </Routes>
    </>
  );
};
export default AppRoute;
