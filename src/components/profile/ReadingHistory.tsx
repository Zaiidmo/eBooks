import React from 'react';
import { Book, Star, MessageCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import type { ReadingHistory as ReadingHistoryType } from '@/types';

interface ReadingHistoryProps {
  userId: string;
}

export const ReadingHistory: React.FC<ReadingHistoryProps> = ({ userId }) => {
  // Mock data - Replace with API call using userId
  const history: ReadingHistoryType[] = [
    {
      id: '1',
      bookTitle: 'The Midnight Library',
      author: 'Matt Haig',
      borrowDate: '2024-01-10',
      returnDate: '2024-02-01',
      rating: 5,
      review: 'A beautiful exploration of life\'s possibilities. Couldn\'t put it down!'
    },
    {
      id: '2',
      bookTitle: 'Project Hail Mary',
      author: 'Andy Weir',
      borrowDate: '2023-12-15',
      returnDate: '2024-01-05',
      rating: 4,
      review: 'Fascinating scientific concepts and great character development.'
    },
    {
      id: '3',
      bookTitle: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      borrowDate: '2023-11-20',
      returnDate: '2023-12-10',
      rating: 5,
      review: 'A masterpiece of storytelling. Absolutely captivating!'
    }
  ];

  if (!history.length) {
    return (
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Book className="w-5 h-5" />
          Reading History
        </h2>
        <p className="text-center text-gray-500 py-4">
          No reading history available
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Book className="w-5 h-5" />
        Reading History
      </h2>
      
      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.bookTitle}</h3>
                <p className="text-sm text-gray-600">{item.author}</p>
              </div>
              {item.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <span>Borrowed: {item.borrowDate}</span>
              <span className="mx-2">•</span>
              <span>Returned: {item.returnDate}</span>
            </div>
            
            {item.review && (
              <div className="mt-3 text-sm text-gray-700">
                <div className="flex items-center gap-1 mb-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">Review</span>
                </div>
                <p className="italic">{item.review}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};