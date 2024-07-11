import {LoginForm} from "./LoginForm.tsx";
import {useLogin} from "./useLogin.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Credentials} from "../model/Credentials.ts";
import {useAuthContext} from "../context/useAuthContext.tsx";
import React from "react";

export const LoginPage: React.FC = () => {
  const context = useAuthContext();
  const location = useLocation();
  const mutation = useLogin();
  const navigate = useNavigate();

  const handleLogin = (credentials: Credentials) => {
    mutation.mutate(credentials, {
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

  return (<LoginForm isError={mutation.isError} isLoading={mutation.isPending}
                     errorMessage={mutation.error?.response?.data?.message} onFormSubmit={handleLogin} />);
}
