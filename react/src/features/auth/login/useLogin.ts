import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import publicApi from "../../../config/api-client.ts";
import {AxiosErrorResponseData, Credentials} from "../models/models.ts";

const useLogin = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseData>, Credentials>({
    mutationKey: ['login'],
    mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/auth/login', credentials)
  });
}

export {useLogin}