import axios from "axios";
import AxiosContext from './AxiosContext.tsx';
import React from "react";

const axiosInstance = axios.create({
});

// axios provider
const AxiosProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  )
}

export default AxiosProvider;