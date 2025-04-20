import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import Loading from '../subcomponents/Loading';
import useAuth from '../../../auth/useAuth';
import axiosPrivate from '../../../api/axios';

const UsersProfile = () => {
  const { username } = useParams();
  const { auth } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get(`/profile/${username}`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (isAdminOrOwner) fetchProfile();
    else setLoading(false);
  }, [username, auth?.accessToken]);

  if (loading) return <Loading />;
  if (!profile) return <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow-md mt-10"><p className="text-center">Profile not found or unauthorized.</p></div>;
  
  const handleBioToggle = () => setIsBioExpanded(prevState => !prevState);

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10 relative">
      {/* Edit Icon */}
      {isAdminOrOwner && (
        <Link
          to="edit"
          className="absolute top-0 right-0 p-6 text-2xl opacity-75 hover:opacity-100 transition text-primary"
        >
          <FaUserEdit />
        </Link>
      )}

      {/* Profile Top */}
      <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:items-start md:grid-cols-[25%_75%] gap-6 mb-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-base-200 flex items-center justify-center mx-auto">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Profile Avatar" className="object-cover w-full h-full" />
          ) : (
            <span className="text-sm text-base-content opacity-60">No Avatar</span>
          )}
        </div>

        {/* Name & Bio */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-sm text-base-content opacity-80 mb-1">@{profile.username}</p>

          {/* Bio with "Read More" */}
          <div className="text-base mt-2 md:pr-8 px-2 md:px-0">
            {isBioExpanded ? (
              <>
                <p>{profile.bio}</p>
                <button
                  onClick={handleBioToggle}
                  className="text-primary text-sm mt-2 underline"
                >
                  Read Less
                </button>
              </>
            ) : (
              <>
                <p>{profile.bio?.substring(0, 150)}...</p>
                <button
                  onClick={handleBioToggle}
                  className="text-primary text-sm mt-2 underline"
                >
                  Read More
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Email:</strong> <a href={'mailto:' + profile.email} className='link link-primary link-hover'>{profile.email}</a></p>
          <p><strong>Location:</strong> {profile.location || "Not specified"}</p>
          <p className='capitalize'><strong>Role:</strong> {profile.role}</p>
        </div>
        <div>
          {profile.website && (
            <p><strong>Website:</strong> <a className="link link-primary link-hover" href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a></p>
          )}
          {profile.github && (
            <p><strong>GitHub:</strong> <a className="link link-primary link-hover" href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></p>
          )}
          {profile.linkedin && (
            <p><strong>LinkedIn:</strong> <a className="link link-primary link-hover" href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin}</a></p>
          )}
          {profile.otherWebsite && (
            <p><strong>Other Website:</strong> <a className="link link-primary link-hover" href={profile.otherWebsite} target="_blank" rel="noreferrer">{profile.otherWebsite}</a></p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        {profile.skills && profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span key={index} className="bg-primary text-primary-content px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p>No skills listed.</p>
        )}
      </div>
    </div>
  );
};

export default UsersProfile;
