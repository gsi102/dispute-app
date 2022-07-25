import React, { useState } from "react";
import Input from "./UI/inputs/Input";
import Button from "./UI/buttons/Button";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInThunk } from "../store/reducers/usersSliceThunk";
import { LocationType } from "../types/types";

const Login: React.FC = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const navigate = useNavigate();
  const location: LocationType = useLocation();
  const dispatch = useAppDispatch();

  const logIn = async (): Promise<void> => {
    const prevPage = location.state ? location.state.from.pathname : "/";
    const navigateOnSuccess = () => navigate(prevPage, { replace: true });
    try {
      const response = await dispatch(
        signInThunk({ loginInput, passwordInput, navigateOnSuccess })
      ).unwrap();
    } catch (err) {
      alert("error(console");
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
        onChange={(e: any) => setLoginInput(e.target.value)}
      />
      <Input
        value={passwordInput}
        className="input-password"
        type="password"
        placeholder="pass"
        onChange={(e: any) => setPasswordInput(e.target.value)}
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
