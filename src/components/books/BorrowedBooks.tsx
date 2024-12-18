import React from "react";
import { BookOpen, Search } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import type { Borrower } from "@/types";

interface BorrowedBooksProps {
  borrowers: Borrower[];
}

export const BorrowedBooks: React.FC<BorrowedBooksProps> = ({ borrowers }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBorrowers = borrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.bookId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <GlassCard className="overflow-hidden mt-8">
      <div className="p-6 border-b border-white/20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6" />
          Borrowed Books
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
          <input
            type="text"
            placeholder="Search by borrower or book..."
            className="w-full pl-10 pr-4 py-2 bg-gray-200/80 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
        <thead className="bg-gray-50/50 dark:bg-gray-700 text-gray-500 dark:text-gray-100 ">
        <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Borrower
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Book ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Borrow Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {filteredBorrowers.map((borrower) => (
              <tr key={borrower.id} className="hover:bg-white/10">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                  {borrower.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {borrower.bookId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {borrower.borrowDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {borrower.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      borrower.status === "on_time"
                        ? "bg-green-100 text-green-800"
                        : borrower.status === "overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {borrower.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
