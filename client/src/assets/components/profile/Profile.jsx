import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../subcomponents/Loading'
import ProfileContext from '../../context/ProfileContext';
import { MdModeEdit, MdBlock } from "react-icons/md";
import { IoPersonAddSharp, IoFlag } from "react-icons/io5";
import { RiUserUnfollowFill } from "react-icons/ri";
import useAuth from '../../../auth/useAuth';
import About from './About/About';
import Project from './ProjectsSec/Project';
import Experiance from './Experience/Experience'
import Blog from './Blog/Blog';
import { axiosPrivate } from '../../../api/axios';
import { motion, AnimatePresence } from 'framer-motion'
import { notificationTemplate } from '../../utils/notificationTemplate';

const Profile = () => {

  const { auth, setAuth } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const { profile, loading } = useContext(ProfileContext);
  if (loading) return <Loading />;
  if (!profile) return <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow-md"><p className="text-center">Profile not found.</p></div>;

  // Logic for showing edit feature on profile visits
  const isOwnProfile = profile.username === auth?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const canEdit = isOwnProfile || isAdminOrOwner;

  // Logic for allowing follow/unfollow on profile visits
  const canFollow = !isOwnProfile && auth?.id !== profile.id;
  const isFollowing = auth?.following.includes(profile.id);


  const handleFollow = async () => {
    try {
      const response = await axiosPrivate.post(`/api/users/follow/${profile.id}`, {}, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });

      // Follow user
      if (!isFollowing) {
        setAuth(prev => ({
          ...prev,
          following: [...prev.following, profile.id]
        }));

        // Payload for creating notification
        const payload = notificationTemplate.follow(auth, profile.id);

        // Send notification
        try {
          const notifyUser = await axiosPrivate.post('/system/notifications', payload, {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`
            }
          });

        }
        catch (err) {
          console.error('Failed to notify user:', err);
        }


      } else { // Unfollow user
        setAuth(prev => ({
          ...prev,
          following: prev.following.filter(id => id !== profile.id)
        }));

        // Payload for deleting notification
        const payload = {
          type: 'follow',
          from: auth?.id,
          to: profile.id,
        }

        // Delete notification
        try {
          const deleteNotification = await axiosPrivate.delete('/system/notifications', {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            data: payload
          });

        }
        catch (err) {
          console.error('Failed to notify user:', err);
        }

      }
    }
    catch (err) {
      console.log(err);
    }
  };

  return profile
    ?
    (
      <div >
        <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md relative">
          <div
            className='absolute top-0 right-0 m-6 flex flex-wrap flex-row-reverse justify-between items-center'
            ref={dropdownRef}
          >
            <div className='px-2 md:px-4 cursor-pointer relative' onClick={() => setShowDropdown(prev => !prev)}>
              <span className="text-xl">⋮</span>
            </div>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-0 right-0 mt-8 mr-2 md:mr-4 bg-base-200 rounded-box shadow z-50'
                >
                  <ul>
                    {/* Edit Button */}
                    {canEdit &&
                      <li>
                        <Link
                          to='edit'
                          className="opacity-75 hover:opacity-100 transition text-sm/5 py-4 px-6 flex"
                        >
                          <div className="flex flex-row justify-center items-center">
                            <MdModeEdit className="text-xl text-primary" />&nbsp;&nbsp;Edit
                          </div>

                        </Link>
                      </li>
                    }
                    {canFollow &&
                      <>

                        {/* Follow/Unfollow button */}
                        <li>
                          <button className='opacity-75 hover:opacity-100 transition text-sm/5 py-4 px-6 flex' onClick={() => handleFollow()}>
                            {isFollowing ?
                              <div className='flex flex-row justify-center items-center'>
                                <RiUserUnfollowFill className="text-xl text-primary" />&nbsp;&nbsp;Unfollow
                              </div>
                              :
                              <div className='flex flex-row justify-center items-center'>
                                <IoPersonAddSharp className="text-xl text-primary" />&nbsp;&nbsp;Follow
                              </div>
                            }
                          </button>
                        </li>

                        {/* Block button */}
                        <li>
                          <button
                            className="opacity-75 hover:opacity-100 transition text-sm/5 py-4 px-6 flex"
                          >
                            <div className="flex flex-row justify-center items-center">
                              <MdBlock className="text-xl text-primary" />&nbsp;&nbsp;Block
                            </div>

                          </button>
                        </li>

                        {/* Report button */}
                        <li>
                          <button
                            className="opacity-75 hover:opacity-100 transition text-sm/5 py-4 px-6 flex"
                          >
                            <div className="flex flex-row justify-center items-center">
                              <IoFlag className="text-xl text-primary" />&nbsp;&nbsp;Report
                            </div>

                          </button>
                        </li>

                      </>
                    }
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Top Section */}
          {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6"> */}
          <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:items-start md:grid-cols-[25%_75%] gap-6 mb-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-base-200 flex items-center justify-center mx-auto">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile Avatar" className="object-cover w-full h-full" />
              ) : (
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?ga=GA1.1.656611579.1737386998&semt=ais_hybrid&w=740" alt="Profile Avatar" className="object-cover w-full h-full" />

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
        <About />
        <Experiance />
        <Project />
        <Blog />
      </div>

    )
    :
    <Loading />
}

export default Profile