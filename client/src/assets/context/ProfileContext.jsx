// ProfileProvider.jsx
import { createContext, useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../auth/useAuth';

const ProfileContext = createContext(null);

export const ProfileProvider = () => {
  const { auth } = useAuth();
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosPrivate.get(`/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken && username) fetchProfile();
    
  }, [auth?.accessToken, username]);

  return (
<ProfileContext.Provider value={{ profile, setProfile, loading, setLoading }}>
      <Outlet />
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
