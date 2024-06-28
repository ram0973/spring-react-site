// axios context
import React from "react";
import {AxiosInstance} from "axios";

const AxiosContext = React.createContext<AxiosInstance | null>(null);

export default AxiosContext;