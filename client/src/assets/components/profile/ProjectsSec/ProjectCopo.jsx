import { FaEdit } from "react-icons/fa";

function ProjectCopo({ project, onEdit }) {
  return (
    <div className="relative mt-3 p-3 pl-5 bg-base-300 rounded-lg">
      <div className="absolute shadow-md top-3 bg-[#ffffffa6] p-2 rounded-3xl right-4 cursor-pointer text-xl text-primary opacity-75 hover:opacity-100">
        <FaEdit onClick={onEdit} />
      </div>
      <h1 className="font-medium">{project.title}</h1>
      <h6>{project.duration}</h6>
      <h3>Description:{project.description}</h3>
      <h3>Skill: {project.skills}</h3>
      {project.image && (
        <img className="h-[100px] mt-2 rounded" src={project.image} alt="project" />
      )}
    </div>
  );
}

export default ProjectCopo;
