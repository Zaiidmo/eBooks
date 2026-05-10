import React from 'react';
import { CurrentBorrows } from './CurrentBorrows';
import { ReadingHistory } from './ReadingHistory';

interface ReadingActivityProps {
  userId: string;
}

export const ReadingActivity: React.FC<ReadingActivityProps> = ({ userId }) => {
  // Mock data - Replace with API calls
  const currentBorrows = [
    {
      id: '1',
      bookTitle: 'Dune',
      borrowDate: '2024-02-01',
      dueDate: '2024-03-01',
      isOverdue: false,
      coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200'
    },
    {
      id: '2',
      bookTitle: 'The Three-Body Problem',
      borrowDate: '2024-01-15',
      dueDate: '2024-02-15',
      isOverdue: true,
      coverUrl: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=200'
    }
  ];

  return (
    <div className="space-y-8">
      <CurrentBorrows borrows={currentBorrows} />
      <ReadingHistory userId={userId} />
    </div>
  );
};