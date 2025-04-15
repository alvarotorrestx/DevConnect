import { FaEdit } from "react-icons/fa";

function ExperiCompo({ experience, onEdit }) {
  return (
    <div className="relative mt-3 p-3 pl-5 bg-[#e1dcdc82] rounded-sm">
      <div className="absolute top-3 right-4 cursor-pointer text-xl text-primary opacity-75 hover:opacity-100">
        <FaEdit onClick={onEdit} />
      </div>
      <h2>Role: {experience.role}</h2>
      <h3>Company: {experience.company}</h3>
      <h3>{experience.duration}</h3>
      <p>Description: {experience.description}</p>
    </div>
  );
}

export default ExperiCompo;
