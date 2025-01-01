import { BookCard } from "@/components/books/BooksCard";
import { getAllBooks } from "@/services/books/getAllBooks";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Book } from "@/types";

function Books() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    <div className="w-screen mt-16 h-full">
      <div className="flex flex-col items-center justify-center p-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-poiret text-left w-full font-bold mb-8">
          Featured Books
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books && books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.book_id}
                book={book}
                onBorrow={(id) => console.log("Borrow book:", id)}
              />
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Books;
