const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

/**
 * Register a new user
 */
export const registerUser = async (
  email: string,
  preferredUsername: string,
  password: string
): Promise<string> => {
  const response = await fetch(`${API_GATEWAY_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      preferredUsername,
      password
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  const data = await response.json();
  return data.message;
};