import LoginForm from "./LoginForm.tsx";
import {useLogin} from "./useLogin.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Credentials} from "../model/Credentials.ts";
import {useAuth} from "../../context/auth/useAuth.tsx";

const LoginPage = () => {
  const context = useAuth();
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
        context.login(credentials.email);
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
