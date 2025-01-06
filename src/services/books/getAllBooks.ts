import { Book } from "@/types";

const API_GATEWAY_URL = import.meta.env.VITE_AWS_API_GATEWAY_URL;

export const getAllBooks = async ():Promise<Book[]> => {
  try {

    const response = await fetch(`${API_GATEWAY_URL}/books`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Parsed data:', data);

    if (!data.books || !Array.isArray(data.books)) {
      throw new Error('Invalid data format: Expected an array in `data.books`');
    }

    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};
