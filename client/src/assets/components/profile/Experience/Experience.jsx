import { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import ExperiCompo from "./ExperiCompo";
import ExperienceModal from "./AddExperienceModal";
import useAuth from "../../../../auth/useAuth";
import ProfileContext from "../../../context/ProfileContext";

function Experience() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: "Full Time",
      company: "Tech Solutions",
      duration: "Jan 2023 - May 2024",
      description: "Worked on frontend using React.js, built internal tools.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

  const { auth } = useAuth();
  const { profile } = useContext(ProfileContext);

  const isOwnProfile = auth?.username === profile?.username;
  const isAdminOrOwner = ['admin', 'owner'].includes(auth?.role);
  const canEdit = isOwnProfile || isAdminOrOwner;

  const handleAdd = () => {
    setEditExperience(null);
    setIsModalOpen(true);
  };

  const handleEdit = (experience) => {
    setEditExperience(experience);
    setIsModalOpen(true);
  };

  const handleSave = (newExperience) => {
    if (editExperience) {
      // update
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editExperience.id ? { ...newExperience, id: exp.id } : exp
        )
      );
    } else {
      // add
      const id = Date.now();
      setExperiences((prev) => [...prev, { ...newExperience, id }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-5 relative">
      <div className="flex items-center justify-between font-semibold">
        <h1>Experience</h1>
        {canEdit && (
          <div
            className="text-2xl bg-base-300 shadow-lg p-[5px] rounded-3xl flex gap-5 cursor-pointer opacity-75 hover:opacity-100 transition text-primary"
            onClick={handleAdd}
          >
            <FaPlus />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {experiences.map((exp) => (
          <ExperiCompo
            key={exp.id}
            experience={exp}
            onEdit={() => handleEdit(exp)}
            canEdit={canEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        <ExperienceModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={editExperience}
        />
      )}
    </div>
  );
}

export default Experience;
