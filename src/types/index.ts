export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  cover: string;
  description: string;
  status: "available" | "borrowed";
  borrowedBy?: string;
  borrowedDate?: Date;
  returnDate?: Date;
  totalCopies?: number;
  available?: number;
  category?: string;
  publishedYear?: number;
}

export interface Borrower {
  id: string;
  name: string;
  bookId: string;
  borrowDate: string;
  dueDate: string;
  status: "on_time" | "overdue" | "returned";
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  category: string;
  publishedYear: number;
}

export interface UserProfile {
  id: string;
  name: string;
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