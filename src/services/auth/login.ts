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
    console.log("Login Response:", response);
    

    if (!response.ok) {
      const error = await response.json();
      console.error("Error Response:", error);
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();

    if (!data.user) {
      throw new Error("User data is undefined in the server response");
    }

    // Dispatch login action with user data
    dispatch(
      login({
        user: {
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
        },
        accessToken: data.tokens.accessToken,
      })
    );

    return data;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw new Error(error.message || "An error occurred during login");
  }
};
