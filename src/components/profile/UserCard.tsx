import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import type { UserProfile } from '@/types';

interface UserCardProps {
  user: UserProfile;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <GlassCard className="overflow-hidden h-full">
      {/* Profile Content */}
      <div className="px-6 pb-6  flex flex-col w-full h-full items-center justify-center ">
        {/* Avatar */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgg70Am-72KbUa1epNC2B7RYDnrMKmEBf9Yg&s"
            alt={user.preferred_username}
            className="w-32 h-32 my-10 md:my-0 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-black shadow-lg"
          />
        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white ">{user.preferred_username}</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Calendar className="w-4 h-4 dark:text-gray-400" />
            <span className="text-md dark:text-gray-400">Member since {user.memberSince}</span>
          </div>
        </div>
        {/* Contact Details */}
        <div className="mt-2 text-md space-y-3">
          <div className="flex items-center gap-3 dark:text-gray-400 text-gray-700">
            <Mail className="w-5 h-5 dark:text-gray-400" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};