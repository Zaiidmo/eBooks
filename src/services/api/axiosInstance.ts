import { logout } from "@/store/slices/authSlice";
import { RootState, store } from "@/store/store";
import { toastNotifier } from "@/utils/toastNotifier";
import axios from "axios";
import { useSelector } from "react-redux";

//Axios Instance
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useSelector((state: RootState) => state.auth.token);
    if (token) {
      config.headers.Authorization == `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if( error.response?.status === 400) {
            toastNotifier({
                message: 'Unauthorized. Redirecting to login ...',
                type: "error",
                duration: 3000
            })
            store.dispatch(logout());

            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
            
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;