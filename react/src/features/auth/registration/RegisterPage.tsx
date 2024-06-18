import RegisterForm from "./RegisterForm.tsx";
import {useRegisterUserAccount} from "./useRegisterUserAccount.ts";
import {Credentials} from "../models/models.ts";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

  const {
    mutate,
    isPending,
    error,
    isError,
    isSuccess
  } = useRegisterUserAccount();

  const handleRegisterAccount = (credentials: Credentials) => {
    mutate(credentials);
  }

  const navigate = useNavigate();

  const handleNavigateToLoginPage = () => {
    navigate("/login");
  }

  return (
    <RegisterForm isError={isError}
                  isLoading={isPending}
                  isSuccess={isSuccess}
                  errorMessage={error?.response?.data?.message}
                  onFormSubmit={handleRegisterAccount}
                  onLinkClick={handleNavigateToLoginPage}
    />
  );
};

export default RegisterPage;