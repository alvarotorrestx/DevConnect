import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../subcomponents/Loading'
import ProfileContext from '../../context/ProfileContext';
import { FaUserEdit } from "react-icons/fa";
import useAuth from '../../../auth/useAuth';

const Profile = () => {

  const { auth } = useAuth();

  const { profile, loading } = useContext(ProfileContext);
  if (loading) return <Loading />;
  if (!profile) return <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow-md mt-10"><p className="text-center">Profile not found.</p></div>;

  const isOwnProfile = profile.username === auth?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const canEdit = isOwnProfile || isAdminOrOwner;

  return profile
    ?
    (
      <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10 relative">
        {/* Edit Icon - For User, Admin, and Owner */}
        {canEdit && (
          <Link
            to='edit'
            className="absolute top-0 right-0 p-6 text-2xl opacity-75 hover:opacity-100 transition text-primary"
          >
            <FaUserEdit />
          </Link>
        )}
        {/* Top Section */}
        {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6"> */}
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
            <p className="text-base mt-2 md:pr-8 px-2 md:px-0">{profile.bio || "No bio provided."}</p>
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
              <p><strong>Website:</strong> <a className="link link-primary link-hover" href={profile.website} target="_blank">{profile.website}</a></p>
            )}
            {profile.github && (
              <p><strong>GitHub:</strong> <a className="link link-primary link-hover" href={profile.github} target="_blank">{profile.github}</a></p>
            )}
            {profile.linkedin && (
              <p><strong>LinkedIn:</strong> <a className="link link-primary link-hover" href={profile.linkedin} target="_blank">{profile.linkedin}</a></p>
            )}
            {profile.otherWebsite && (
              <p><strong>Other Website:</strong> <a className="link link-primary link-hover" href={profile.otherWebsite} target="_blank">{profile.otherWebsite}</a></p>
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

    )
    :
    <Loading />
}

export default Profile