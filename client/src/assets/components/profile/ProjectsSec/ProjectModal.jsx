import { useState } from "react";
import { axiosPrivate } from "../../../../api/axios";
import useAuth from "../../../../auth/useAuth";

function ProjectModal({ onClose, onSave, initialData }) {
  const { auth, setAuth } = useAuth();
  const [type, setType] = useState(initialData ? "update" : "Add");
  const [form, setForm] = useState({
    id: initialData?._id || "",
    title: initialData?.title || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
    media: initialData?.media || { images: [], videos: [] },
    sourceCodeLink: initialData?.sourceCodeLink || "",
    liveLink: initialData?.liveLink || "",
    techStack: initialData?.techStack || [],
  });

  console.log("initial data", initialData);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Add") {
      console.log(form);
      try {
        const response = await axiosPrivate.post("/projects/create", form, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
      onSave(form);
   
    } else if (type === "update") {
   
      const updatedForm = { _id: form.id };

      for (const key in form) {
        const currentVal = form[key];
        const initialVal = initialData?.[key];

        if (JSON.stringify(currentVal) !== JSON.stringify(initialVal)) {
          updatedForm[key] = currentVal;
        }
      }

      try {
        const response = await axiosPrivate.patch(
          "/projects/update",
          updatedForm,

          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );
        onClose(false)
        onSave(response.data)
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImageChange = (e) => {
    const url = e.target.value.trim();
    setForm((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images: url ? [url] : [],
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-base-200 p-4 sm:p-8 rounded-xl shadow-xl w-[95%] max-w-2xl">
        <h2 className="text-2xl font-semibold text-base-content mb-4">
          {initialData ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., Jan 2024 - Dec 2024)"
            value={form.duration}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="textarea textarea-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Skills (e.g., React, Node)"
            value={form.techStack}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="images"
            placeholder="Image URL"
            value={form.media.images[0] || ""}
            onChange={handleImageChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="sourceCodeLink"
            placeholder="Github URL"
            value={form.sourceCodeLink}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="liveLink"
            placeholder="Live Preview URL"
            value={form.liveLink}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
