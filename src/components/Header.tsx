import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const userLogin = useAppSelector((state) => state.users.userData.login);

  return (
    <header className="header">
      <div className="header-block">
        <Link to="/">Main</Link>
        <Link to="/create-dispute">Create Dispute</Link>
        {/* {isAuth ? <Link to="/create-dipuste">Create Dispute</Link> : ""} */}
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
