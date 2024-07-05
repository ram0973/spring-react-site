import {SignupForm} from "./SignupForm.tsx";
import {useSignup} from "./useSignup.ts";
import {useNavigate} from "react-router-dom";
import {Credentials} from "../model/Credentials.ts";
import React from "react";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useSignup();

  const handleRegisterAccount = (credentials: Credentials) => {
    mutation.mutate(credentials);
    navigate("/login")
  }

  return (<SignupForm isError={mutation.isError} isLoading={mutation.isPending} isSuccess={mutation.isSuccess}
                      errorMessage={mutation.error?.response?.data?.message} onFormSubmit={handleRegisterAccount}/>);
}
