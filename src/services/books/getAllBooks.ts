const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;
const localUrl = 'http://localhost:3000';

// src/services/books/getAllBooks.ts
export const getAllBooks = async () => {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/books`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('response:', response.body);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    // Return the `books` field
    return responseData.books;
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
};
