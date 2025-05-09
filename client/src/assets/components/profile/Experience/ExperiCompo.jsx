import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import ThemeContext from "../../../context/ThemeContext";

function ExperiCompo({ experience, onEdit, canEdit }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="relative mt-3 p-3 pl-5 bg-base-300 rounded-lg">
      {canEdit && (
        <div
          className={`absolute shadow-md top-3 p-2 rounded-3xl right-4 cursor-pointer text-xl text-primary hover:opacity-100
          ${darkMode ? "bg-[rgb(42,48,60)] opacity-90" : "bg-[#ffffffa6] opacity-70"}`}
          onClick={onEdit}
        >
          <FaEdit />
        </div>
      )}

      <h2>Role: {experience.role}</h2>
      <h3>Company: {experience.company}</h3>
      <h3>Duration: {experience.duration}</h3>
      <p>Description: {experience.description}</p>
    </div>
  );
}

export default ExperiCompo;
