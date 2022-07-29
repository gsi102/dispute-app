import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setAuth, setUser } from "../store/reducers/usersSlice";

import styles from "../styles/App.module.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const userLogin = useAppSelector((state) => state.users.userData.login);

  const logout = () => {
    dispatch(setAuth({ isAuth: false }));
    dispatch(setUser({ userData: "reset" }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBlock}>
        <Link to="/">Main</Link>
        <Link to="/create-dispute">Create Dispute</Link>
        {/* {isAuth ? <Link to="/create-dipuste">Create Dispute</Link> : ""} */}
      </div>
      <div className={styles.logo}></div>
      <div className={styles.headerBlock}>
        {isAuth ? <Link to="/profile">Profile: {userLogin}</Link> : ""}
        {isAuth ? <div onClick={logout}>Logout</div> : ""}
        {!isAuth ? <Link to="/login">Login</Link> : ""}
        {!isAuth ? <Link to="/registration">Registration</Link> : ""}
      </div>
    </header>
  );
};

export default Header;
