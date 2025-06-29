import { useContext, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import ProfileContext from "../../../context/ProfileContext";
import AboutModal from "./AboutModal";
import { axiosPrivate } from "../../../../api/axios";
import useAuth from "../../../../auth/useAuth";

// Toasts
import { useErrorToast } from "../../toast/useErrorToast";
import ErrorToast from "../../toast/ErrorToast";
import { useSuccessToast } from "../../toast/useSuccessToast";
import SuccessToast from "../../toast/SuccessToast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const About = () => {
  const { profile, setProfile, loading } = useContext(ProfileContext);
  const [aboutContent, setAboutContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  // Updated permission logic
  const isOwnProfile = profile?.username === auth?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const canEdit = isOwnProfile || isAdminOrOwner;

  // Success toast
  const {
    message: successMessage,
    show: showSuccessToast,
    showSuccess,
  } = useSuccessToast();

  // Error toast
  const {
    message: errorMessage,
    show: showErrorToast,
    showError,
  } = useErrorToast();

  useEffect(() => {
    if (profile) {
      setAboutContent(profile.bio || "No bio provided.");
    }
  }, [profile]);

  const handleSave = async (newContent) => {
    if (newContent.trim() === profile.bio?.trim()) {
      setShowModal(false);
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `/profile/${profile.username}/edit`,
        { bio: newContent },
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        }
      );

      if (response?.status === 200) {
        showSuccess("About section updated successfully");
        setAboutContent(newContent);

        // Update global profile state to trigger re-render
        setProfile((prev) => ({ ...prev, bio: newContent }));
      } else {
        showError("Failed to update About section");
      }
    } catch (err) {
      if (!err?.response) {
        showError("No Server Response");
      } else {
        showError(err.response?.data?.message || "Update failed");
      }
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-5 relative">
      <div className="flex pb-4 items-center justify-between font-semibold">
        <h1>About</h1>
        {canEdit && (
          <div
            className="text-2xl shadow-lg bg-base-300 p-[7px] rounded-3xl flex items-center justify-center gap-5 cursor-pointer opacity-75 hover:opacity-100 transition text-primary"
            onClick={() => setShowModal(true)}
          >
            <FaEdit />
          </div>
        )}
      </div>

      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="whitespace-pre-line">{aboutContent}</h3>
      </div>

      {showModal && (
        <AboutModal
          initialContent={aboutContent}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          username={profile.username}
        />
      )}

      <SuccessToast
        message={successMessage}
        show={showSuccessToast}
        icon={<FaCheckCircle className="text-[--tertiary] text-2xl" />}
      />
      <ErrorToast
        message={errorMessage}
        show={showErrorToast}
        icon={<FaTimesCircle className="text-red-600 text-2xl" />}
        iconBgColor="bg-red-700"
      />
    </div>
  );
};

export default About;
