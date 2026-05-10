// For users who borrowed the book, we only expose minimal info
export class PublicBorrowInfoDto {
    borrow_date: string;
    dueDate: string;
  }
  
  // Base DTO for public book information
  export class GetBookResponseDto {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category: string;
    quantity: number;
    cover: string;
    description: string;
    price: number;
  }
  
  // For getting multiple books
  export class GetBooksResponseDto {
    books: GetBookResponseDto[];
    totalBooks: number;
  }
  