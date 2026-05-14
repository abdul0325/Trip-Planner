"use server"
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from "axios";
import { NEXT_PUBLIC_API_URL } from "./env";
import { cookies } from "next/headers";

const DEBUG_MODE = true
const SHOW_ERROR_ONLY = true
function createHttpClient(): AxiosInstance {
    const client = axios.create({
        baseURL: NEXT_PUBLIC_API_URL,
        timeout: 10_000,
        withCredentials: true,
    });

    /* -------------------- REQUEST -------------------- */
    client.interceptors.request.use(
        async (config) => {
            const cookieStore = await cookies();
            const cookieHeader = cookieStore.toString();

            if (cookieHeader) config.headers.set("Cookie", cookieHeader);

            if (config.data instanceof FormData) {
                delete config.headers["Content-Type"];
            } else if (config.data && !(config.data instanceof FormData)) {
                config.headers["Content-Type"] = "application/json";
            }

            if (DEBUG_MODE && !SHOW_ERROR_ONLY) {
                console.log("[HTTP → REQUEST]", {
                    method: config.method,
                    url: config.url,
                    headers: config.headers,
                    params: config.params,
                    data: config.data instanceof FormData ? "[FormData]" : config.data,
                });
            }
            return config;
        },
        (error: AxiosError) => {
            if (DEBUG_MODE) {
                console.error("[HTTP → REQUEST ERROR]", error);
            }
            return Promise.reject(error);
        }
    );

    /* -------------------- RESPONSE -------------------- */
    client.interceptors.response.use(
        (response: AxiosResponse) => {
            if (DEBUG_MODE && !SHOW_ERROR_ONLY) {
                console.log("[HTTP ← RESPONSE]", {
                    url: response.config.url,
                    status: response.status,
                    headers: response.headers,
                    data: response.data,
                });
            }
            return response;
        },
        (error: AxiosError<{ message: string | string[] }>) => {
            if (DEBUG_MODE) {
                console.error("[HTTP ← RESPONSE ERROR]", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    url: error.config?.url,
                    response: error.response?.data,
                });
            }

            // normalize error shape
            return Promise.reject({
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                isAxiosError: true,
            });
        }
    );

    return client;
}
export const api = createHttpClient()