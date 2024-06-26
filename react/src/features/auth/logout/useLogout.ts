import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import publicApi from "../../common/api-client.ts";
import {AxiosErrorResponseData} from "../../common/AxiosErrorResponseData.ts";
import {useAuth} from "../../context/useAuth.tsx";
import {useNavigate} from "react-router-dom";

const useLogout = () => {
  const context = useAuth();
  const navigate = useNavigate();

  return useMutation<AxiosError<AxiosErrorResponseData>>({
    mutationKey: ['logout'],
    mutationFn: () => publicApi.post('/api/v1/auth/logout'),
    onSuccess: () => {
      context.logout();
      navigate("/");
    }
  });
}

export {useLogout}