import { BookOpen, Users, Clock, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BookTable } from "@/components/books/BookTable";
import { BorrowedBooks } from "@/components/books/BorrowedBooks";
import type { Book, Borrower } from "@/types";

// Sample data - In a real app, this would come from an API
const sampleBooks: Book[] = [
  {
    book_id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    description:
      "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
    borrowedDate: new Date("2024-03-01"),
    category: "Fiction",
    quantity: 3,
    price : 15.99,
    returnDate: new Date("2024-03-15"),
  },
  {
    book_id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    category: "Science Fiction",
    quantity: 5,
    price : 10.99,
  },
];



const stats = [
  {
    label: "Total Books",
    value: "2,543",
    icon: BookOpen,
    color: "bg-blue-500/80",
  },
  {
    label: "Active Users",
    value: "1,234",
    icon: Users,
    color: "bg-green-500/80",
  },
  { label: "Due Returns", value: "42", icon: Clock, color: "bg-yellow-500/80" },
  { label: "Overdue", value: "8", icon: AlertCircle, color: "bg-red-500/80" },
];

export const Dashboard = () => {
  const handleEditBook = (book: Book) => {
    console.log("Edit book:", book);
  };

  const handleDeleteBook = (bookId: string) => {
    console.log("Delete book:", bookId);
  };

  return (
    <div className="w-full">
      <div className="p-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-poiret text-left w-full font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <BookTable
          books={sampleBooks}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />

        {/* <BorrowedBooks borrowers={sampleBorrowers} /> */}
      </div>
    </div>
  );
};
