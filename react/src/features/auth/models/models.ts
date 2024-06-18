export interface Credentials {
  email: string;
  password: string;
}

export interface Person {
  id: number;
  email: string;
  enabled: boolean;
}

export interface AxiosErrorResponseData {
  desc: string,
  message: string,
  path: string,
  status: number,
  timestamp: string,
}