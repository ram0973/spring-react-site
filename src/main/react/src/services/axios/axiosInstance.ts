import axios from "axios";

export const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
    transformRequest: [function (data, headers) {
      headers["X-XSRF-TOKEN"] = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      return data;
    }],
  },
);
