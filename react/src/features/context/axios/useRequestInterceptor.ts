// hook for intercepting api requests
import {useAxios} from "./useAxios.ts";
import React from "react";

const useRequestInterceptor = function (config = (c: any) => c, error = (e: any) => Promise.reject(e)) {
  const axiosInstance = useAxios();

  React.useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(config, error);
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  });
};

export default useRequestInterceptor;