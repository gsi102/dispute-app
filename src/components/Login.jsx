import React, { useState } from "react";
import Input from "./UI/inputs/Input.jsx";
import Button from "./UI/buttons/Button.jsx";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInThunk } from "../store/reducers/usersSlice.js";

const Login = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logIn = async () => {
    const prevPage = location.state ? location.state.from.pathname : "/";
    const navigateOnSuccess = () => navigate(prevPage, { replace: true });
    try {
      const response = await dispatch(
        signInThunk({ loginInput, passwordInput, navigateOnSuccess })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login: a</h1>
      <h1>Pass: 1</h1>
      <Input
        value={loginInput}
        className="input-login"
        type="email"
        placeholder="email"
        onChange={(e) => setLoginInput(e.target.value)}
      />
      <Input
        value={passwordInput}
        className="input-password"
        type="password"
        placeholder="pass"
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <Button className="login-button" onClick={logIn}>
        Login
      </Button>
      <div>
        <h1>Not registered?</h1>
        <Link to="/registration">Registration</Link>
      </div>
    </div>
  );
};

export default Login;
