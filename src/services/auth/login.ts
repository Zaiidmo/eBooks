import { AppDispatch } from "@/store/store";
import { login } from "@/store/slices/authSlice";

const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // console.log("response", response);
    

    if (!response.ok) {
      throw new Error("Failed to authenticate user");
    }

    const { user, idToken, accessToken, refreshToken } = await response.json();

    // Dispatch login action with user data
    dispatch(
      login({
        user,
        accessToken,
      })
    );

    return { idToken, accessToken, refreshToken };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
