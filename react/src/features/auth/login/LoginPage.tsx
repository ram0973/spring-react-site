import LoginForm from "./LoginForm.tsx";
import {useLogin} from "./useLogin.ts";
import {Credentials} from "../models/models.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

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
        navigate("/");
      }
    });
  }

  const handleNavigateToRegisterPage = () => {
    navigate("/register");
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