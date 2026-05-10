const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

/**
 * Confirm a user's registration
 */
export const confirmUser = async (
    email: string,
    confirmationCode: string
  ): Promise<string> => {
    const response = await fetch(`${API_GATEWAY_URL}/auth/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        confirmationCode
      })
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Confirmation failed');
    }
  
    const data = await response.json();
    return data.message;
  };