import {useAuth} from "../context/auth/useAuth";
import axiosInstance from "./axiosInstance";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function AxiosInstance() {

  const authContext = useAuth();
  const navigate = useNavigate()

  // useEffect(() => {
  //   axiosInstance.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     }, function (error) {
  //       if (error.response.status == 403) {
  //         authContext.logout()
  //         navigate("/login")
  //       }
  //       return Promise.reject(error);
  //     });
  // }, [authContext, navigate]);

  return (<></>)
}
