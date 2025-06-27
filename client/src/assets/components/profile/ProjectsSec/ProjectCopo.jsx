import { FaEdit, FaGithub, FaGlobe, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

function ProjectCopo({ project, onEdit, canEdit ,onDelete }) {
  const { darkMode } = useContext(ThemeContext);

  return (
   
    <div className="relative mt-3 p-3 pl-5 bg-base-300 rounded-lg">
      {canEdit && (
        <div
          className={`absolute shadow-md top-3 p-2 rounded-3xl right-4 cursor-pointer text-xl text-primary hover:opacity-100
          ${
            darkMode
              ? "bg-[rgb(42,48,60)] opacity-90"
              : "bg-[#ffffffa6] opacity-70"
          }`}
          onClick={onEdit}
        >
          <FaEdit />
        </div>
      )}
      {
        (
          <div
          className={`absolute shadow-md top-14 p-2 rounded-3xl right-4 cursor-pointer text-xl text-primary hover:opacity-100
          ${
            darkMode
              ? "bg-[rgb(42,48,60)] opacity-90"
              : "bg-[#ffffffa6] opacity-70"
          }`}
          onClick={()=>onDelete(project._id)}
        >
          <FaTrash/>
        </div>
        )
      }
      <div className="grid grid-cols-[60%_40%] gap-3">
        <div className="left flex flex-col items-start gap-3 justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl mt-2">{project.title}</h1>

            <h3 className="font-semibold">
              Tech Stack:{" "}
              <span className="font-normal">{project.techStack}</span>
            </h3>
            <h3 className="font-semibold">
              Description:{" "}
              <span className="font-normal">{project.description}</span>
            </h3>
          </div>

          <div className="flex gap-5">
            {project.sourceCodeLink && 
            <a
              href={project.sourceCodeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} color="black" />
            </a>}
            {project.liveLink && <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:underline text-2xl"
            >
              <FaGlobe />
            </a>}
          </div>
        </div>
        <div className="right flex mt-2 flex-col items-end mr-[18%]">
          <h3 className="sm:mr-6">{project.duration}</h3>
          {project?.media?.images[0] && (
            <img
              className="h-[150px] mt-2 rounded sm:mr-5"
              src={project.media.images[0]}
              alt="project"
            />
          )}
        </div>
      </div>
    </div>
   
  );
}

export default ProjectCopo;
