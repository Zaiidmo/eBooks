import React from 'react';
import { Book, PenSquare, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { GlassCard } from '../ui/GlassCard';
import type { Book as BookType } from '@/types';

interface BookTableProps {
  books: BookType[];
  onEdit: (book: BookType) => void;
  onDelete: (bookId: string) => void;
}

export const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete }) => {
  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6 border-b border-white/20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Book className="w-6 h-6" />
          Book Inventory
        </h2>
        <Button variant="ghost" className='text-white dark:text-black bg-black dark:bg-gray-200' size="sm">
          <PlusCircle className="w-4 h-4" />
          Add New Book
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-gray-700 text-gray-500 dark:text-gray-100 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-white/10">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{book.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">ISBN: {book.isbn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.available}/{book.totalCopies}
                  </span> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button 
                    onClick={() => onEdit(book)}
                    >
                        <PenSquare className="w-4 h-4" />
                        Edit
                    </Button>
                    <Button 
                    onClick={() => onDelete(book.id)}
                    >
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