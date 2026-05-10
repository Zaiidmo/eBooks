import React from 'react';
import { Mail, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserProfile } from '@/types';

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEdit }) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
          onClick={onEdit}
        >
            <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      <div className="relative px-8">
        <div className="absolute -top-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={user.id}
            alt={user.preferred_username}
          />
        </div>
        <div className="pt-20 pb-8">
          <h1 className="text-2xl font-bold text-gray-900">{user.preferred_username}</h1>
          <p className="text-gray-600">Member since {user.memberSince}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{user.email}</span>
            </div>
            {/* <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{user.location}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};