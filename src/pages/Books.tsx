import { BookCard } from "@/components/cards/BooksCard";

const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    description:
      "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
    status: "available",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    status: "borrowed",
  },
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    description:
      "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
    status: "available",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    status: "borrowed",
  },
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    description:
      "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
    status: "available",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    status: "borrowed",
  },
] as const;

function Books() {
  return (
    <>
     <div className="w-screen">
         <div className="flex flex-col items-center justify-center p-8 max-w-screen-xl mx-auto">
              <h1 className="text-3xl md:text-6xl font-knewave text-left w-full font-bold mb-8">Featured Books</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={(id) => console.log("Borrow book:", id)}
                  />
                ))}
              </div>
         </div>
     </div>
    </>
  );
}

export default Books;
