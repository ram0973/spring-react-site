// hook for intercepting api responses
import {useAxios} from "./useAxios.ts";
import React from "react";

const useResponseInterceptor = function(success = (r:any) => r, error = (e:any) => Promise.reject(e), deps = []) {
  const axiosInstance = useAxios();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(success, error);
    setReady(true);
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, ...deps);

  return ready;
};

export default useResponseInterceptor;