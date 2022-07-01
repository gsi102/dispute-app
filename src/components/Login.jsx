import React, { useState } from "react";
import Input from "./UI/inputs/Input.jsx";
import Button from "./UI/buttons/Button.jsx";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/reducers/usersSlice.js";
import { usersAPI } from "../api/api.js";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prevPage = location.state ? location.state.from.pathname : "/";

  const logIn = async function() {
    try {
      const status = await usersAPI.signIn(loginInput, passwordInput);
      if (status === 200) {
        dispatch(setAuth());
        navigate(prevPage, { replace: true });
      }
    } catch (err) {
      console.error(err);
      return alert("invalid data (console)");
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
    </div>
  );
};

export default Login;
