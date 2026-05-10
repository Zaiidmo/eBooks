import React from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface CurrentBorrow {
  id: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  isOverdue: boolean;
}

interface CurrentBorrowsProps {
  borrows: CurrentBorrow[];
}

export const CurrentBorrows: React.FC<CurrentBorrowsProps> = ({ borrows }) => {
  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Current Borrows
      </h2>
      
      <div className="space-y-4">
        {borrows.map((borrow) => (
          <div
            key={borrow.id}
            className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{borrow.bookTitle}</h3>
                <p className="text-sm text-gray-600">
                  Borrowed on: {borrow.borrowDate}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                ${borrow.isOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {borrow.isOverdue && <AlertCircle className="w-4 h-4" />}
                Due: {borrow.dueDate}
              </div>
            </div>
          </div>
        ))}
        
        {borrows.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No books currently borrowed
          </p>
        )}
      </div>
    </GlassCard>
  );
};