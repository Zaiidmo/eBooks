export interface Book {
  book_id: string;
  title: string;
  author: string;
  category: string;
  quantity: number;
  cover: string;
  isbn?: string;
  description: string;
  borrowedBy?: [Borrower];
  price: number;
}

export interface BooksResponse {
  books: Book[];
  totalBooks: number;
}

export interface Borrower {
  userId: string;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'NOT BORROWED';
}

export interface UserProfile {
  id: string;
  preferred_username: string;
  email: string;
  memberSince: string;
}

export interface ReadingHistory {
  id: string;
  bookTitle: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  rating?: number;
  review?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  category: string;
  isbn: string;
  quantity: number;
  price: number;
  cover: FileList;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
