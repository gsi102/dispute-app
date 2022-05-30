import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header.jsx";
import LeftSide from "./LeftSide.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
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
