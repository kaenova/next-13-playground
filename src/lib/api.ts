import axios, { Axios } from "axios";

const axiosClientSingleton = () => {
  return axios.create({
    withCredentials: true,
  });
};

type AxiosClientSingleton = ReturnType<typeof axiosClientSingleton>;

const globalForAxios = globalThis as unknown as {
  api: AxiosClientSingleton | undefined;
};

export const api = globalForAxios.api ?? axiosClientSingleton();

if (process.env.NODE_ENV !== "production") globalForAxios.api = api;
