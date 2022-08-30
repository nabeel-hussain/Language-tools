import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Users,
  Home,
  TranslatorView,
  AboutUs,
  SpellCheckerView,
} from "../../../Pages";

const MenuItems: MenuItem[] = require("../../../Data/menu.json");
interface Registry {
  Key: string;
  Component: ReactNode;
}
const componentRegistry: Registry[] = [
  { Key: "Home", Component: <Home /> },
  { Key: "TranslatorView", Component: <TranslatorView /> },
  { Key: "Users", Component: <Users /> },
  { Key: "AboutUs", Component: <AboutUs /> },
  { Key: "SpellCheckerView", Component: <SpellCheckerView /> },
];
//This function will setup all the routes insdie the application.
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
