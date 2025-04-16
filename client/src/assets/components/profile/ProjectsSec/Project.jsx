import { FaEdit, FaPlus, FaArrowRight } from "react-icons/fa";
import ProjectCopo from "./ProjectCopo";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

function Project() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Mobile Recycle",
      duration: "Jan 2025-2026",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, at dolorem...",
      skills: "React.js, Node.js, express.js",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKC5yJhCCyjyhrC-2XBv3H4i1-ojuLblUlg&s",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleAdd = () => {
    setEditProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setIsModalOpen(true);
  };

  const handleSave = (newProject) => {
    if (editProject) {
      // Editing existing project
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? { ...newProject, id: p.id } : p))
      );
    } else {
      // Adding new project
      const id = Date.now();
      setProjects((prev) => [...prev, { ...newProject, id }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10 relative">
      <div className="flex items-center justify-between font-semibold">
        <h1>Projects</h1>
        <div
  className="text-2xl bg-base-300 p-[5px] rounded-3xl flex gap-5 cursor-pointer opacity-75 hover:opacity-100 transition text-primary"

>
  <FaPlus onClick={handleAdd} />
</div>

      </div>

      <div className="mt-3 flex flex-col space-y-4">
        {(showAll ? projects : projects.slice(0, 2)).map((project) => (
          <ProjectCopo
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
          />
        ))}

        {projects.length > 2 && (
          <button
            className="mt-4 px-4 py-2 text-[15px] border-[2px] flex items-center justify-center gap-2 border-[#918282] text-black rounded-md hover:text-primary-focus hover:border-primary-focus transition duration-200"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less Projects" : "Show More Projects"} <FaArrowRight />
          </button>
        )}
      </div>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={editProject}
        />
      )}
    </div>
  );
}

export default Project;
