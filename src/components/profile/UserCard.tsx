import { useEffect, useState } from 'react';
import { Mail, Calendar } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { fetchUserProfile } from '@/services/auth/getUserData';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { BeatLoader } from 'react-spinners';

const UserCard = () => {
  const accessToken = useSelector((state: RootState) => state.auth.token) || "";
  const [userData, setUserData] = useState<any | null>(null); // Adjust `any` to your `UserProfile` type if available.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile(accessToken);
        setUserData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);

  if (loading) {
    return <div className='w-full h-full flex justify-center text-red-500 items-center'> <BeatLoader color='#ff0000'/> </div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }
  return (
    <GlassCard className="overflow-hidden md:h-full py-8 lg:py-0">
      {/* Profile Content */}
      <div className="px-6 pb-6 flex flex-col w-full h-full items-center justify-center">
        {/* Avatar */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgg70Am-72KbUa1epNC2B7RYDnrMKmEBf9Yg&s"
          alt={userData.preferred_username}
          className="w-32 h-32 my-10 md:my-0 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-black shadow-lg"
        />
        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {userData.preferred_username || "Username"}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Calendar className="w-4 h-4 dark:text-gray-400" />
            <span className="text-md dark:text-gray-400">
              Member since {userData.memberSince || "N/A"}
            </span>
          </div>
        </div>
        {/* Contact Details */}
        <div className="mt-2 text-md space-y-3">
          <div className="flex items-center gap-3 dark:text-gray-400 text-gray-700">
            <Mail className="w-5 h-5 dark:text-gray-400" />
            <span>{userData.email || "Email not available"}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default UserCard;