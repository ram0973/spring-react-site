import SignupForm from "./SignupForm.tsx";
import {useSignup} from "./useSignup.ts";
import {Credentials} from "../models/models.ts";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {

  const {
    mutate,
    isPending,
    error,
    isError,
    isSuccess
  } = useSignup();

  const handleRegisterAccount = (credentials: Credentials) => {
    mutate(credentials);
  }

  const navigate = useNavigate();

  const handleNavigateToLoginPage = () => {
    navigate("/login");
  }

  return (
    <SignupForm isError={isError}
                isLoading={isPending}
                isSuccess={isSuccess}
                errorMessage={error?.response?.data?.message}
                onFormSubmit={handleRegisterAccount}
                onLinkClick={handleNavigateToLoginPage}
    />
  );
};

export default SignupPage;