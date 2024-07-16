import React from 'react';
import {axiosInstance} from "./axiosInstance.ts";
import {useAuthContext} from "../../auth/context/useAuthContext.tsx";
import {setItemToLocalStorage} from "../../auth/context/localStorageUtils.ts";
import {router} from "../../router.tsx";

// hook for intercepting api requests
export const useAxiosInterceptor = function () {
  const authContext = useAuthContext();
  React.useEffect(() => {
    const authInterceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      }, function (error) {
        if (authContext.person && error.response.status == 401) {
          authContext.person = null;
          setItemToLocalStorage("webapp.auth", null);
          router.navigate("/login").then();
        }
        return Promise.reject(error);
      });
    return () => {
      axiosInstance.interceptors.response.eject(authInterceptor); // remove interceptor on dismount/auth change
    };
  }, [authContext, authContext.person]); // run if user changes
};