import axios from "axios";
import {setToLocalStorage} from "../localStorageUtils.ts";
import {router} from "../../router.tsx";

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      setToLocalStorage("webapp.auth", null);
      router.navigate("/login").then();
      console.log("axios 401")
    }
    // if (error.response.status == 500) {
    //   router.navigate("/error");
    // }
    return Promise.reject(error);
  }
)
