export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    cover: string;
    description: string;
    status: 'available' | 'borrowed';
    borrowedBy?: string;
    borrowedDate?: Date;
    returnDate?: Date;
  }
  