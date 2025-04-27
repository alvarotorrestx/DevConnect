import { useState } from "react";

function ExperienceModal({ onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    role: initialData?.role || "",
    company: initialData?.company || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-base-200 p-4 sm:p-8 rounded-xl shadow-xl w-[95%] max-w-2xl">  
        <h2 className="text-2xl font-semibold text-base-content mb-4">
          {initialData ? "Edit Experience" : "Add Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., Jan 2023 - May 2024)"
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

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceModal;
