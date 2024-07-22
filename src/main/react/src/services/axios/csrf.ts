import {axiosInstance} from "./axiosInstance.ts";

async function getCsrfToken() {
  const response = await axiosInstance.get('/api/v1/auth/csrf')
  const payload = await response.data
  return payload.token
}