
import { UserCard } from '@/components/profile/UserCard';
import { ReadingActivity } from '@/components/profile/ReadingActivity';
import { Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-8 px-3 md:px-0 flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto max-h-[90vh] overflow-y-auto">
      {/* User Card - 1/3 width */}
      <div className="lg:w-1/3">
        <UserCard user={user} />
      </div>

      {/* Reading Activity - 2/3 width */}
      <div className="lg:w-2/3">
        <ReadingActivity userId={user.id} />
      </div>
    </div>
  );
};