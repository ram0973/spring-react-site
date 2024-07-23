import React from 'react';
import {axiosInstance} from "./axiosInstance.ts";
import {useAuthContext} from "../../auth/context/useAuthContext.tsx";
import {router} from "../../router.tsx";
import {useLocation} from "react-router-dom";

// hook for intercepting api requests
export const useAxiosInterceptor = function () {
  const authContext = useAuthContext();
  const location = useLocation();
  // TODO: do it in router on page change
  React.useEffect(() => {
    axiosInstance.get('/api/v1/auth/me')
      .then(res => {
        console.log(res);
        if (!res.data) {
          authContext.person = null;
          //setItemToLocalStorage("webapp.auth", {});
          router.navigate("/login").then();
        }
      });
    // const authInterceptor = axiosInstance.interceptors.response.use(
    //   function (response) {
    //     return response;
    //   }, function (error) {
    //     // if (authContext.person && error.response.status == 401) {
    //     //   authContext.person = null;
    //     //   setItemToLocalStorage("webapp.auth", {});
    //     //   router.navigate("/login").then();
    //     // }
    //     return Promise.reject(error);
    //   });
    // return () => {
    //   axiosInstance.interceptors.response.eject(authInterceptor); // remove interceptor on dismount/auth change
    // };
  }, [authContext, location]); // run if user changes
};