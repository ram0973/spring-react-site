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
      router.navigate("/login");
    }
    // if (error.response.status == 500) {
    //   router.navigate("/error");
    // }
    return error;
  }
)
