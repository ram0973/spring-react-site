import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import publicApi from "../../common/api-client.ts";
import {AxiosErrorResponseData} from "../../common/AxiosErrorResponseData.ts";
import {Credentials} from "../model/Credentials.ts";

const useLogin = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseData>, Credentials>({
    mutationKey: ['login'],
    mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/auth/login', credentials)
  });
}

export {useLogin}