import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuth = useSelector((state) => state.users.isAuth);
  const userLogin = useSelector((state) => state.users.userData.login);

  return (
    <header className="header">
      <div className="header-block">
        <Link to="/">Main</Link>
        <Link to="/debates-page">DebatesPage</Link>
      </div>
      <div className="logo"></div>
      <div className="header-block">
        {isAuth ? <Link to="/profile">Profile: {userLogin}</Link> : ""}
        {!isAuth ? <Link to="/login">Login</Link> : ""}
        {!isAuth ? <Link to="/registration">Registration</Link> : ""}
      </div>
    </header>
  );
};

export default Header;
