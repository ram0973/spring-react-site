import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import publicApi from "../../../config/api-client.ts";
import {AxiosErrorResponseData, Credentials} from "../models/models.ts";

const useRegisterUserAccount = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseData>, Credentials>({
    mutationKey: ['register-user-account'],
    mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/auth/register', credentials)
  });
}

export {useRegisterUserAccount}