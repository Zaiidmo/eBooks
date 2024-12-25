import { AppDispatch } from "@/store/store";
import { login } from "@/store/slices/authSlice";

// Define the login function that interacts with the API Gateway
export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<{ idToken: string; accessToken: string; refreshToken: string }> => {
  try {
    const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL || "";
    console.log("API_GATEWAY_URL:", API_GATEWAY_URL);

    const response = await fetch(`${API_GATEWAY_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials or something went wrong.");
    }

    const data = await response.json();
    const { idToken, accessToken, refreshToken } = data.tokens;

    const role = data.user.role;

    // Dispatch login action with the token data
    dispatch(
      login({
        user: { email, username: email, role: role },
        accessToken: accessToken,
      })
    );

    return { idToken, accessToken, refreshToken };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to login. Please check your credentials.");
  }
};
