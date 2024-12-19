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
      {/* Gradient Banner */}
      <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
      
      {/* Profile Content */}
      <div className="px-6 pb-6 -mt-16">
        {/* Avatar */}
        <div className="relative inline-block">
          <img
            src=""
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Member since {user.memberSince}</span>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>{user.email}</span>
          </div>
    
        </div>

      </div>
    </GlassCard>
  );
};