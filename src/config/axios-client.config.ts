"use client"
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

// Use relative /api path in the browser so it works on any port/host
const API_BASE = typeof window !== "undefined" ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api");

function createHttpClient(): AxiosInstance {
  const client = axios.create({ baseURL: API_BASE, timeout: 15_000 });

  client.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      else delete config.headers.Authorization;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (config.data) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  client.interceptors.response.use(
    (r: AxiosResponse) => r,
    (error: AxiosError<{ message?: string | string[]; error?: string }>) => {
      const msg = error.response?.data?.message;
      const displayMsg = Array.isArray(msg) ? msg[0] : msg || error.response?.data?.error || "Something went wrong";
      toast.error(displayMsg);
      return Promise.reject({
        message: displayMsg,
        status: error.response?.status,
        data: error.response?.data,
        isAxiosError: true,
      });
    }
  );
  return client;
}

export const api = createHttpClient();
export const clientApi = api;
