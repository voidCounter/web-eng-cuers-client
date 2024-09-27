import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${useAuthStore.getState().authenticatedSession?.session_id}`
    },
});

// AxiosInstance.interceptors.request.use(
//     requestInterceptoronFulfilled, requestInterceptoronRejected
// );
//
// // Axios Interceptor: Response Method
// AxiosInstance.interceptors.response.use(
//     (response) => response, responseInterceptoronRejected
// );