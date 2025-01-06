const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;


/**
 * Fetch user profile
 */
export const fetchUserProfile = async (accessToken: string) => {
    const response = await fetch(`${API_GATEWAY_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  
    const data = await response.json();
    return data.userAttributes;
  };