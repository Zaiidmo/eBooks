import { useState, useEffect } from 'react';
import type { UserProfile } from '@/types';
import { useSelector } from 'react-redux';
import { fetchUserProfile } from '@/helpers/cognito';

// This is a mock of Cognito authentication
// Replace with actual Cognito implementation
export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state : any) => state.auth.token); 
  

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile(accessToken)
        .then((data : any) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile data:", err);
        });
    }
    setLoading(false);

  }, [accessToken]);

  return { user, loading };
};