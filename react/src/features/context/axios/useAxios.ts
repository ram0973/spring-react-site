// use the axios context
import React from "react";
import AxiosContext from "./AxiosContext.tsx";

function useAxios() {
  const context = React.useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within a AxiosProvider");
  }
  return context;
}

export {useAxios};