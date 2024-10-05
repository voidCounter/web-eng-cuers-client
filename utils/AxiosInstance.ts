import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to inject the authorization token dynamically
AxiosInstance.interceptors.request.use((config) => {
    const session_id = useAuthStore.getState().authenticatedSession?.session_id;

    if (session_id) {
        config.headers["Authorization"] = `Bearer ${session_id}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});