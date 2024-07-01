import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "../../common/AxiosErrorResponseDto.ts";
import {useAuth} from "../../context/auth/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../common/axiosInstance.ts";

const useLogout = () => {
  const context = useAuth();
  const navigate = useNavigate();

  return useMutation<AxiosError<AxiosErrorResponseDto>>({
    mutationKey: ['logout'],
    mutationFn: () => axiosInstance.post('/api/v1/auth/logout'),
    onSuccess: () => {
      context.logout();
      console.info("successfully logout")
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status == 400) {
        context.logout();
        navigate("/");
      } else {
        console.error(error);
      }
    }
  });
}

export {useLogout}