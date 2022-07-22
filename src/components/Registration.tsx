import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import Input from "./UI/inputs/Input";
import Button from "./UI/buttons/Button";
import { signUpThunk } from "../store/reducers/usersSlice";

const Registrarion: React.FC = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUp = async function(): Promise<void> {
    const navigateOnSuccess = () => navigate("/login", { replace: true });
    const credentials = {
      login: loginInput,
      password: passwordInput,
      email: emailInput,
    };
    try {
      const status = await dispatch(
        signUpThunk({ credentials, navigateOnSuccess })
      ).unwrap();
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
        onChange={(e: any) => setLoginInput(e.target.value)}
      />
      <Input
        value={emailInput}
        className="input-email"
        type="email"
        placeholder="add an email"
        onChange={(e: any) => setEmailInput(e.target.value)}
      />
      <Input
        value={passwordInput}
        className="input-password"
        type="password"
        placeholder="create a pass*"
        required
        onChange={(e: any) => setPasswordInput(e.target.value)}
      />
      <Button className="signup-button" onClick={signUp}>
        Create
      </Button>
    </div>
  );
};

export default Registrarion;
