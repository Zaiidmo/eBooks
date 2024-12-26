import { logout } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";

/**
 * Logs out the user by invalidating their access token.
 */
const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

export const logoutUser = async (accessToken: string, dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        // console.log("Successfully logged out.");
        dispatch(logout());
      } else {
        const errorData = await response.json();
        console.error("Failed to log out:", errorData.message);
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };
  