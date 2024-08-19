"use client";

import React, { useState } from "react";
import "./style.scss";
import Button from "@/components/atoms/Button";
import useSWRMutation from "swr/mutation";
import { loginFetcher } from "@/lib/fetcher";
import Input from "@/components/atoms/Input";
import AlertBox from "@/components/atoms/Alert";

const INIT_ALERT: {
  type: "error";
  message: string;
} = {
  type: "error",
  message: "",
};

export default function LoginPage() {
  const [alert, setAlert] = useState(INIT_ALERT);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    "https://dummyjson.com/auth/login",
    loginFetcher
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    trigger({ username, password }).then((res) => {
      console.log(res);
      if (res?.message === "Invalid credentials") {
        setAlert({
          type: "error",
          message: res.message,
        });

        return;
      }

      localStorage.setItem("user", JSON.stringify(res));
      window.location.href = "/dashboard/product";
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {!!alert.message && (
          <AlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(INIT_ALERT)}
          />
        )}
        <form onSubmit={handleLogin}>
          <Input
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" full loading={isMutating}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
