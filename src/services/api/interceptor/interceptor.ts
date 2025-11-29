import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

let ACCESS_TOKEN: string | null = null;

export const setClientToken = (token: string | null) => {
  ACCESS_TOKEN = token;
};

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? new AxiosHeaders();

  if (ACCESS_TOKEN) {
    config.headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
  }

  return config;
});

instance.interceptors.response.use((res) => res.data);

export default instance;
