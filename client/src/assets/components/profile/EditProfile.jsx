import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import useAuth from '../../../auth/useAuth'
import ProfileContext from '../../context/ProfileContext';
import Loading from '../subcomponents/Loading';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { profile, loading } = useContext(ProfileContext);

  const [firstName, setFirstName] = useState('');
  const [tempFirstName, setTempFirstName] = useState('');
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);

  console.log(profile)

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setTempFirstName(profile.firstName || '');
    }
  }, [profile]);

  const isOwnProfile = profile?.username === auth?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const allowEditing = isOwnProfile || isAdminOrOwner;

  useEffect(() => {
    if (!loading && !allowEditing) {
      navigate('/unauthorized', { replace: true });
    }
  }, [allowEditing, loading, navigate]);

  if (loading) return <Loading />;
  if (!profile) return <div>Profile not found.</div>;
  if (!allowEditing) return null;

  return (
    <div className="max-w-[90%] md:max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <p className="text-sm text-base-content opacity-75">
        Edit your details to help others connect with you better.
      </p>

      {/* First Name Field */}
      <div className="form-control mt-6">
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="input input-bordered flex-1"
            value={isEditingFirstName ? tempFirstName : firstName}
            disabled={!isEditingFirstName}
            onChange={(e) => setTempFirstName(e.target.value)}
          />
          {!isEditingFirstName ? (
            <button type="button" className="btn btn-ghost text-lg">
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm">
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm">
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End First Name Field */}

    </div>
  );
};

export default EditProfile;
