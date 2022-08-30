import logo from "../../../Assets/Images/logo.png";
import { Layout } from "antd";

const { Header } = Layout;
const MainHeader = () => {
  return (
    <>
      <Header className="light-background">
        <div className="logo">
          <img className="logo-img" src={logo}></img>
        </div>
      </Header>
    </>
  );
};
export default MainHeader;
