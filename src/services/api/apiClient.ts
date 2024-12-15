import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials: {
  identifier: string;
  password: string;
  rememberMe: boolean;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
};

export const verifyOtp = async (otpData: {
  identifier: string;
  otp: string;
  rememberDevice: boolean;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", otpData);
    return response.data;
  } catch (err) {
    throw err;
  }
};
