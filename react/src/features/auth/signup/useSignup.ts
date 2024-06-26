import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import publicApi from "../../common/api-client.ts";
import {AxiosErrorResponseData} from "../../common/AxiosErrorResponseData.ts";
import {Credentials} from "../model/Credentials.ts";

const useSignup = () => {
  return useMutation<void, AxiosError<AxiosErrorResponseData>, Credentials>({
    mutationKey: ['register-user-account'],
    mutationFn: (credentials: Credentials) => publicApi.post('/api/v1/auth/register', credentials)
  });
}

export {useSignup}