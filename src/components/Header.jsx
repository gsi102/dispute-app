import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuth = useSelector((state) => state.users.isAuth);
  return (
    <header className="header">
      <div className="header-block">
        <Link to="/">Main</Link>
        <Link to="/debates-page">DebatesPage</Link>
      </div>
      <div className="logo"></div>
      <div className="header-block">
        {!isAuth ? <Link to="/login">Login</Link> : ""}
        <Link to="/registration">Registration</Link>
      </div>
    </header>
  );
};

export default Header;
