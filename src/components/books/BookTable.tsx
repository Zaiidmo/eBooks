import React, { useEffect } from "react";
import { Book, PenSquare, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { GlassCard } from "../ui/GlassCard";
import type { Book as BookType } from "@/types";
import { GlassModal } from "../modals/GlassModal";
import { AddBookForm } from "./AddBookForm";
import { getAllBooks } from "@/services/books/getAllBooks";
import { BeatLoader } from "react-spinners";



const handleDeleteBook = (bookId: string) => {
  console.log("Delete book:", bookId);
}
const handleEditBook = (bookId: string) => {
  console.log("Edit book:", bookId);
}

export const BookTable = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [books, setBooks] = React.useState<BookType[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await getAllBooks();
        console.log("Books:", data);

        setBooks(data);
      } catch (err: any) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error details:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BeatLoader color="#ff0000" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-500">
        <p>Failed to load books: {error}</p>
      </div>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6 border-b border-white/20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Book className="w-6 h-6" />
          Book Inventory
        </h2>
        <GlassModal
          trigger={
            <Button
              variant="ghost"
              className="text-white dark:text-black bg-black dark:bg-gray-200"
              size="sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Book
            </Button>
          }
        >
          <AddBookForm />
        </GlassModal>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-700 text-gray-500 dark:text-gray-100 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {books.map((book) => (
              <tr key={book.book_id} className="hover:bg-white/10">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {book.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ISBN: {book.isbn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    book.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.quantity} {book.quantity > 0 ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button onClick={() => handleEditBook(book.book_id)}>
                      <PenSquare className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteBook(book.book_id)}>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
