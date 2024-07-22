import axios from "axios";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create(

  {
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
    transformRequest: [function (data, headers) {
      axios.defaults.headers.post['X-CSRF-Token'] = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      return data;
    }],
  },
);
