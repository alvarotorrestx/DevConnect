import { useContext, useEffect, useState, useRef } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import ProfileContext from '../../context/ProfileContext';
import Loading from '../subcomponents/Loading';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { profile, loading } = useContext(ProfileContext);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        username: profile.username || '',
        bio: profile.bio || '',
        email: profile.email || '',
        location: profile.location || '',
        role: profile.role || '',
        website: profile.website || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        otherWebsite: profile.otherWebsite || '',
        skills: profile.skills || []
      });
    }
  }, [profile]);

  const [isEditing, setIsEditing] = useState({});

  // const handleIsEditing = (field) => {
  //   setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  // };

  const handleIsEditing = (field) => {
    setIsEditing(prev => {
      const updated = { ...prev, [field]: !prev[field] };

      // Focus after enabling the field
      if (!prev[field]) {
        setTimeout(() => currentRef(field), 0); // small delay to ensure input is editable
      }

      return updated;
    });
  };

  const inputRefs = {
    firstName: useRef(),
    lastName: useRef(),
    username: useRef(),
  };

  const currentRef = (field) => {
    inputRefs[field]?.current?.focus();
  };


  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCancel = (field) => {
    setFormData(prev => ({ ...prev, [field]: profile[field] }));
    handleIsEditing(field);
  };


  const { auth } = useAuth();

  const isOwnProfile = profile?.username === auth?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const allowEditing = isOwnProfile || isAdminOrOwner;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile && !allowEditing) {
      navigate('/unauthorized', { replace: true });
    }
  }, [loading, profile, allowEditing, navigate]);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const handleSave = async (field) => {

    // If value hasn't changed, don't send the API request
    if (formData[field]?.trim() === profile[field]?.trim()) {
      handleCancel(field);
      return;
    }

    try {
      const response = await axiosPrivate.put(`/profile/${formData.username}/edit`,
        {
          [field]: formData[field]
        },
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true
        })
    }
    catch (err) {
      // If no error response
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setErrMsg(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);
      } else {
        setErrMsg('Update Failed');
      }

      errRef.current.focus();
    }
    finally {
      handleIsEditing(field);
    }
  };

  if (loading || !formData) return <Loading />;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="max-w-[90%] md:max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <p className="text-sm">
        Edit your details to help others connect with you better.
      </p>

      <div className={errMsg ? "alert alert-error animate-fade flex mt-6" : "offscreen"} tabIndex="-1" ref={errRef} aria-live='assertive'>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errMsg}</span>
      </div>

      {/* First Name Field */}
      <div className="form-control mt-6">
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.firstName}
            id='firstName'
            type="text"
            className="input input-bordered flex-1"
            value={formData.firstName}
            disabled={!isEditing.firstName}
            onChange={handleChange}
          />

          {!isEditing.firstName ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('firstName')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('firstName')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('firstName')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End First Name Field */}

      {/* Last Name Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id='lastName'
            type="text"
            className="input input-bordered flex-1"
            value={formData.lastName}
            disabled={!isEditing.lastName}
            onChange={handleChange}
          />

          {!isEditing.lastName ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('lastName')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('lastName')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('lastName')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Last Name Field */}

      {/* Username Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Username (Also your @ or URL)</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id='username'
            type="text"
            className="input input-bordered flex-1"
            value={formData.username}
            disabled={!isEditing.username}
            onChange={handleChange}
          />

          {!isEditing.username ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('username')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('username')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('username')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Username Field */}

    </div>
  );
};

export default EditProfile;
