import {useMutation} from "@tanstack/react-query";
import {Credentials} from "../model/Credentials.ts";
import axiosInstance from "../../services/axios/axiosInstance.ts";

export const useLogin = () => {

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: Credentials) =>
      axiosInstance
        .post('/api/v1/auth/login', credentials)
        .then(response => response.data),
  });
}