import {LoginForm} from "./LoginForm.tsx";
import {useLogin} from "./useLogin.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Credentials} from "../model/Credentials.ts";
import {useContextAuth} from "../context/useContextAuth.tsx";
import React from "react";

export const LoginPage: React.FC = () => {
  const context = useContextAuth();
  const location = useLocation();

  const {
    mutate,
    isPending,
    error,
    isError,
  } = useLogin();

  const navigate = useNavigate();

  const handleLogin = (credentials: Credentials) => {
    mutate(credentials, {
      onSuccess: () => {
        context.login({email: credentials.email});
        console.info("successfully logged in");
        const origin = location.state?.from?.pathname || "/";
        navigate(origin);
      },
      onError: (error) => {
        console.error("error on login attempt: ", error)
      },
    });
  }

  const handleNavigateToRegisterPage = () => {
    navigate("/signup");
  }

  const errorMessage = error?.response?.data?.message;

  return (
    <LoginForm isError={isError}
               isLoading={isPending}
               errorMessage={errorMessage}
               onFormSubmit={handleLogin}
               onLinkClick={handleNavigateToRegisterPage}
    />
  );
};
