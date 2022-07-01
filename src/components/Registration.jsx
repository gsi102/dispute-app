import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "./UI/inputs/Input";
import Button from "./UI/buttons/Button";
import { setAuth } from "../store/reducers/usersSlice.js";
import { usersAPI } from "../api/api";

const Registrarion = () => {
  const [loginInput, setLoginInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prevPage = location.state ? location.state.from.pathname : "/";

  const signUp = async function() {
    const credentials = {
      login: loginInput,
      password: passwordInput,
      email: emailInput,
    };
    try {
      const status = await usersAPI.signUp(credentials);
      if (status === 200) {
        dispatch(setAuth());
        navigate(prevPage, { replace: true });
      }
    } catch (err) {
      console.error(err);
      return alert("Error (console)");
    }
  };

  return (
    <div
      className="registration"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px 0",
      }}
    >
      <h1>Join now!</h1>

      <Input
        value={loginInput}
        className="input-login"
        type="text"
        placeholder="create a login*"
        required
        onChange={(e) => setLoginInput(e.target.value)}
      />
      <Input
        value={emailInput}
        className="input-email"
        type="email"
        placeholder="add an email"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <Input
        value={passwordInput}
        className="input-password"
        type="password"
        placeholder="create a pass*"
        required
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <Button className="signup-button" onClick={signUp}>
        Create
      </Button>
    </div>
  );
};

export default Registrarion;
