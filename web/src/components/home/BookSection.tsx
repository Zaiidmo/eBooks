import { ChevronRight } from 'lucide-react';
import { BookCard } from '../books/BooksCard';

interface Book {
  book_id: string;
  title: string;
  author: string;
  cover: string;
  isbn?: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  borrowedDate: Date;
  returnDate: Date;
  status: string;
}

interface BookSectionProps {
  title: string;
  books: Book[];
}

const BookSection = ({ title, books }: BookSectionProps) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSection;