import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <LeftSide />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
