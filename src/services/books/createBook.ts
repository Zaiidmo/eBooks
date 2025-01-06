
const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;
// const localUrl = "http://localhost:3000";

// src/services/books/getAllBooks.ts
export const createNewBook = async (formData: FormData ) => {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/books`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    console.log(
      "Response status:",
      response.status,
      "Response headers:",
      response.headers
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Error response body:", errorResponse);
      throw new Error("Failed to create a new book");
    }

    
    return response;
  } catch (error: any) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
};
