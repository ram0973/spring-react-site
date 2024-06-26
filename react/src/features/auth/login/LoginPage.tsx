import LoginForm from "./LoginForm.tsx";
import {useLogin} from "./useLogin.ts";
import {useNavigate} from "react-router-dom";
import {Credentials} from "../model/Credentials.ts";

import {useAuth} from "../../context/useAuth.tsx";

const LoginPage = () => {
  const context = useAuth();
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
        context.login(credentials.email)
        navigate("/");
      }
    });
  }

  const handleNavigateToRegisterPage = () => {
    navigate("/signup");
  }

  return (
    <LoginForm isError={isError}
               isLoading={isPending}
               errorMessage={error?.response?.data?.message}
               onFormSubmit={handleLogin}
               onLinkClick={handleNavigateToRegisterPage}
    />
  );
};

export default LoginPage;
