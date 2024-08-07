import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/useAuthContext.tsx";
import {axiosInstance} from "../../services/axios/axiosInstance.ts";

const logoutApi = () => axiosInstance.post('/api/v1/auth/logout');

export const useLogout = () => {
  const context = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,
    onSuccess: () => {
      context.logout();
      console.info("successfully logout")
      navigate("/");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
