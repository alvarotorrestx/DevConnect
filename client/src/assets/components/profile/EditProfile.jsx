import { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import ProfileContext from '../../context/ProfileContext';
import Loading from '../subcomponents/Loading';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

// Toast imports
import ErrorToast from "../toast/ErrorToast";
import { useErrorToast } from "../toast/useErrorToast";
import SuccessToast from "../toast/SuccessToast";
import { useSuccessToast } from "../toast/useSuccessToast";

const EditProfile = () => {
  const { profile, loading } = useContext(ProfileContext);

  const [formData, setFormData] = useState(null);

  const {
    message: errorMessage,
    show: showErrorToast,
    showError,
  } = useErrorToast();

  const {
    message: successMessage,
    show: showSuccessToast,
    showSuccess,
  } = useSuccessToast();

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        username: profile.username || '',
        avatar: profile.avatar || '',
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
    avatar: useRef(),
    bio: useRef(),
    email: useRef(),
    location: useRef(),
    role: useRef(),
    website: useRef(),
    github: useRef(),
    linkedin: useRef(),
    otherWebsite: useRef(),
    skills: useRef()
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


  const handleSave = async (field) => {

    if (typeof formData[field] === 'string' && formData[field].trim() === profile[field]?.trim()) {
      handleCancel(field);
      return;
    }

    if (Array.isArray(formData[field]) && JSON.stringify(formData[field]) === JSON.stringify(profile[field])) {
      handleCancel(field);
      return;
    }

    const USERNAME_REGEX = /^[a-z0-9-]{5,30}$/;

    const username = formData.username?.trim();
    if (!username) {
      showError("Username is required.");
      return;
    }

    if (field === 'username' && !USERNAME_REGEX.test(formData.username)) {
      showError("Invalid username. 5 to 30 characters. Letters, numbers, and hyphens (-) allowed. Lowercase only.");
      return;
    }

    try {
      const response = await axiosPrivate.put(`/profile/${username}/edit`,
        {
          [field]: formData[field]
        },
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true

        })
      if (response?.status === 200) {
        showSuccess(" Profile updated successfully");
      }
      else {
        showError("Update failed");
      }
    }
    catch (err) {
      // If no error response
      if (!err?.response) {
        showError('No Server Response');
      } else {
        showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}` || 'Update Failed');
      }
    }
    finally {
      handleIsEditing(field);
    }
  };

  const [newSkill, setNewSkill] = useState('');

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };


  if (loading || !formData) return <Loading />;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="max-w-[90%] md:max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-md relative">
      <h1 className="text-2xl font-bold">Edit Profile - {profile.username}</h1>
      <p className="text-sm">
        Edit your details to help others connect with you better.
      </p>

      <a
        href={'/profile/' + profile.username}
        className="absolute top-0 right-0 p-6 text-2xl opacity-75 hover:opacity-100 transition text-primary"
      >
        <FaUserCheck />
      </a>


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
            ref={inputRefs.lastName}
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
            ref={inputRefs.username}
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

      {/* Email Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.email}
            id='email'
            type="text"
            className="input input-bordered flex-1"
            value={formData.email}
            disabled={!isEditing.email}
            onChange={handleChange}
          />

          {!isEditing.email ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('email')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('email')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('email')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Email Field */}

      {/* Avatar Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Avatar</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.avatar}
            id='avatar'
            type="text"
            className="input input-bordered flex-1"
            value={formData.avatar}
            disabled={!isEditing.avatar}
            onChange={handleChange}
          />

          {!isEditing.avatar ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('avatar')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('avatar')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('avatar')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Avatar Field */}

      {/* Bio Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Bio</span>
        </label>
        <div className="flex items-center gap-2">
          <textarea
            ref={inputRefs.bio}
            id='bio'
            type="text"
            className="textarea textarea-bordered flex-1 min-h-20 max-h-40 resize-y"
            value={formData.bio}
            disabled={!isEditing.bio}
            onChange={handleChange}
            maxLength={500}
          />

          {!isEditing.bio ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('bio')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('bio')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('bio')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Bio Field */}

      {/* Location Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.location}
            id='location'
            type="text"
            className="input input-bordered flex-1"
            value={formData.location}
            disabled={!isEditing.location}
            onChange={handleChange}
            maxLength={100}
          />

          {!isEditing.location ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('location')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('location')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('location')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Location Field */}

      {/* Role Field */}
      {isAdminOrOwner && (
        <div className="form-control my-3">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <div className="flex items-center gap-2">
            <select
              ref={inputRefs.role}
              id="role"
              className="select select-bordered flex-1"
              value={formData.role}
              disabled={!isEditing.role}
              onChange={handleChange}
            >
              {/* Only allow valid roles based on auth */}
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              {auth?.role === 'owner' && <option value="admin">Admin</option>}
              {auth?.role === 'owner' && <option value="owner">Owner</option>}
            </select>

            {!isEditing.role ? (
              <button
                type="button"
                className="btn btn-ghost text-lg"
                onClick={() => handleIsEditing('role')}
              >
                <FaEdit />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => handleSave('role')}
                >
                  <FaCheck />
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => handleCancel('role')}
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* End Role Field */}

      {/* Website Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Website</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.website}
            id='website'
            type="text"
            className="input input-bordered flex-1"
            value={formData.website}
            disabled={!isEditing.website}
            onChange={handleChange}
          />

          {!isEditing.website ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('website')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('website')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('website')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Website Field */}

      {/* GitHub Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">GitHub</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.github}
            id='github'
            type="text"
            className="input input-bordered flex-1"
            value={formData.github}
            disabled={!isEditing.github}
            onChange={handleChange}
          />

          {!isEditing.github ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('github')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('github')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('github')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End GitHub Field */}

      {/* LinkedIn Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">LinkedIn</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.linkedin}
            id='linkedin'
            type="text"
            className="input input-bordered flex-1"
            value={formData.linkedin}
            disabled={!isEditing.linkedin}
            onChange={handleChange}
          />

          {!isEditing.linkedin ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('linkedin')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('linkedin')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('linkedin')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End LinkedIn Field */}

      {/* Other Website Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Other Website</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRefs.otherWebsite}
            id='otherWebsite'
            type="text"
            className="input input-bordered flex-1"
            value={formData.otherWebsite}
            disabled={!isEditing.otherWebsite}
            onChange={handleChange}
          />

          {!isEditing.otherWebsite ? (
            <button type="button" className="btn btn-ghost text-lg" onClick={() => handleIsEditing('otherWebsite')}>
              <FaEdit />
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-success btn-sm" onClick={() => handleSave('otherWebsite')}>
                <FaCheck />
              </button>
              <button type="button" className="btn btn-error btn-sm" onClick={() => handleCancel('otherWebsite')}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      {/* End Other Website Field */}

      {/* Skills Field */}
      <div className="form-control my-3">
        <label className="label">
          <span className="label-text">Skills</span>
        </label>

        {isEditing.skills ? (
          <>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-base-300 text-base-content px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-sm text-error hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <input
                ref={inputRefs.skills}
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className="input input-bordered flex-1"
              />
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => handleSave('skills')}
              >
                <FaCheck />
              </button>
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => handleCancel('skills')}
              >
                <FaTimes />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary text-primary-content px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
            <button
              type="button"
              className="btn btn-ghost text-lg"
              onClick={() => handleIsEditing('skills')}
            >
              <FaEdit />
            </button>
          </div>
        )}
      </div>
      {/* End Skills Field */}
      {/* Add Toast Components */}
      <SuccessToast
        message={successMessage}
        show={showSuccessToast}
        status="success"
        icon={
          <FaCheckCircle className="text-[--tertiary] text-2xl" />
        }
      />
      <ErrorToast
        message={errorMessage}
        show={showErrorToast}
        status="error"
        icon={<FaTimesCircle className="text-red-600 text-2xl" />}
        iconBgColor="bg-red-700"
      />

    </div >
  );
};

export default EditProfile;