import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import { axiosPrivate } from '../../api/axios';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
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
        console.error('Failed to fetch profile data:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken && username) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [auth?.accessToken, username]);

  return (
    <ProfileContext.Provider value={{ profile, loading, setLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
