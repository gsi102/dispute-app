import React, { useState } from "react";
import Input from "./UI/inputs/Input.jsx";
import Button from "./UI/buttons/Button.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/reducers/usersSlice.js";

import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const serverName = useSelector((state) => state.messages.serverName);
  const isAuth = useSelector((state) => state.users.isAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prevPage = location.state ? location.state.from.pathname : "/";

  const logIn = async function() {
    const userId = loginInput;
    try {
      const response = await axios.post(`${serverName}/users/${userId}`, {
        password: passwordInput,
      });
      if (response.status === 200) {
        dispatch(setAuth());
        navigate(prevPage, { replace: true });
      }
      return response.data;
    } catch (err) {
      return console.error(err);
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
      <Button className="login button" onClick={logIn}>
        Login
      </Button>
    </div>
  );
};

export default Login;
