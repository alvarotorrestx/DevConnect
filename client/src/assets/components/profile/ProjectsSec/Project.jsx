import { FaPlus, FaArrowRight,FaCheckCircle,FaTimesCircle } from "react-icons/fa";
import ProjectCopo from "./ProjectCopo";
import ProjectModal from "./ProjectModal";
import useAuth from "../../../../auth/useAuth";
import ProfileContext from "../../../context/ProfileContext";
import { useState, useContext, useEffect } from "react";
import { axiosPrivate } from "../../../../api/axios";

// Toast imports
import ErrorToast from "../../toast/ErrorToast";
import { useErrorToast } from "../../toast/useErrorToast";
import SuccessToast from "../../toast/SuccessToast";
import { useSuccessToast } from "../../toast/useSuccessToast";

function Project() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([
    {
      title: "",
      duration: "",
      description: "",
      techStack: "",
      media: {
        images: [],
        videos: [],
      },
      liveLink: "",
      sourceCodeLink: "",
    },
  ]);

  const { auth } = useAuth();
  const { profile } = useContext(ProfileContext);

  const isOwnProfile = auth?.username === profile?.username;
  const isAdminOrOwner = ["admin", "owner"].includes(auth?.role);
  const canEdit = isOwnProfile || isAdminOrOwner;
  const canDelete = isOwnProfile || isAdminOrOwner;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);

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

  const handleAdd = () => {
    setEditProject(null);
    setIsModalOpen(true);
  };


  const handleEdit = (project) => {
    setEditProject(project);
    setIsModalOpen(true);
    console.log("edit project", project._id);
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosPrivate.get("/project/allProjects", {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });   
      setProjects(response.data);
    } catch (err) {
      showError("Failed to fetch projects")
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    console.log("delete project", id);
    try {
      const deleteProject = await axiosPrivate.delete(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      if(deleteProject.status===200){
        showSuccess("Project deleted successfully")
      }
    } catch (err) {
      showError("Failed to delete project")
    }
    fetchProjects();
  };

  const handleSave = async (newProject) => {
   try {
    if (editProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editProject.id ? { ...newProject, id: p.id } : p
        )
      );
      showSuccess("Project updated successfully");
    } else {
      const id = Date.now();
      setProjects((prev) => [...prev, { ...newProject, id }]);
      showSuccess("Project added successfully");
    }
    setIsModalOpen(false);
    fetchProjects();
  } catch (err) {
    showError("Failed to save project");
  }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      fetchProjects();
    }
  }, [auth?.accessToken]);

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-5 relative">
      <div className="flex items-center justify-between font-semibold">
        <h1>Projects</h1>
        {canEdit && (
          <div
            className="text-2xl bg-base-300 shadow-lg p-[5px] rounded-3xl flex gap-5 cursor-pointer opacity-75 hover:opacity-100 transition text-primary"
            onClick={handleAdd}
          >
            <FaPlus />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col space-y-4">
        {(showAll ? projects : projects.slice(0, 2)).map((project) => (
          <ProjectCopo
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
            canEdit={canEdit}
            canDelete={canDelete}
            onDelete={handleDelete}
          />
        ))}

        {projects.length > 2 && (
          <button
            className="mt-4 px-4 py-2 text-[15px] border-[2px] flex items-center justify-center gap-2 border-[#918282] text-black rounded-lg hover:text-primary-focus hover:border-primary-focus transition duration-200"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less Projects" : "Show More Projects"}{" "}
            <FaArrowRight />
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

       <SuccessToast
        message={successMessage}
        show={showSuccessToast}
        status="success"
        icon={
          <FaCheckCircle className="text-green-600 text-4xl bg-transparent p-0 m-0" />
        }
        iconBgColor="bg-blue-200"
      />
      <ErrorToast
        message={errorMessage}
        show={showErrorToast}
        status="error"
        icon={<FaTimesCircle className="text-red-600 text-4xl" />}
        iconBgColor="bg-red-700"
      />
    </div>
  );
}

export default Project;
