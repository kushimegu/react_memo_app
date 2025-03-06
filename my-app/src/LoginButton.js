import React from "react";

import { useLoginStatus } from "./useLoginStatus.js";
import Button from "./Button.js";

export default function LoginButton() {
  const { isLoggedIn, login, logout } = useLoginStatus();

  return (
    <Button className="login-btn" onClick={isLoggedIn ? logout : login}>
      {isLoggedIn ? "ログアウト" : "ログイン"}
    </Button>
  );
}
