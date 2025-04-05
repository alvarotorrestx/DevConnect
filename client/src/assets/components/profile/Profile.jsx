import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../../auth/useAuth';
import { axiosPrivate } from '../../../api/axios';
import Loading from '../subcomponents/Loading'

const Profile = () => {

  const { auth } = useAuth();

  const { username } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosPrivate.get(`/profile/${username}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });
      setProfile(res.data);
    };
    if (auth?.accessToken) fetchProfile();
  }, []);

  return profile ? (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow-md mt-10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
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
          <p className="text-base mt-2">{profile.bio || "No bio provided."}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Location:</strong> {profile.location || "Not specified"}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
        <div>
          {profile.website && (
            <p><strong>Website:</strong> <a className="text-primary" href={profile.website} target="_blank">{profile.website}</a></p>
          )}
          {profile.github && (
            <p><strong>GitHub:</strong> <a className="text-primary" href={profile.github} target="_blank">{profile.github}</a></p>
          )}
          {profile.linkedin && (
            <p><strong>LinkedIn:</strong> <a className="text-primary" href={profile.linkedin} target="_blank">{profile.linkedin}</a></p>
          )}
          {profile.otherWebsite && (
            <p><strong>Other:</strong> <a className="text-primary" href={profile.otherWebsite} target="_blank">{profile.otherWebsite}</a></p>
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

  ) : (
    <Loading />
  );
}

export default Profile