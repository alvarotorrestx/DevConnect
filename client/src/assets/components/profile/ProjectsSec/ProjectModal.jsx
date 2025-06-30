import { useState, useEffect, useRef } from "react";
import { axiosPrivate } from "../../../../api/axios";
import useAuth from "../../../../auth/useAuth";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

// Toast imports
import ErrorToast from "../../toast/ErrorToast";
import { useErrorToast } from "../../toast/useErrorToast";
import SuccessToast from "../../toast/SuccessToast";
import { useSuccessToast } from "../../toast/useSuccessToast";

function ProjectModal({ onClose, onSave, initialData }) {
  const { auth, setAuth } = useAuth();
  const [type, setType] = useState(initialData ? "update" : "Add");
  const projectNameRef = useRef(null);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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

  const [validTitle, setValidTitle] = useState(false);
  const [validDuration, setValidDuration] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validSource, setValidSource] = useState(false);
  const [validLive, setValidLive] = useState(false);
  const [validTechStack, setValidTechStack] = useState(false);

  const TITLE_REGEX = /^[\w\s\-]{3,100}$/;
  const DURATION_REGEX = /^[a-zA-Z]+-\d{4}-[a-zA-Z]+-\d{4}$/;
  const DESCRIPTION_REGEX = /^.{10,}$/;
  const URL_REGEX =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  const TECH_STACK_ITEM_REGEX = /^[a-zA-Z0-9.+#-]{2,20}$/;

  useEffect(() => {
    projectNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(form.title));
    setValidDuration(DURATION_REGEX.test(form.duration));
    setValidDescription(DESCRIPTION_REGEX.test(form.description));
    setValidSource(URL_REGEX.test(form.sourceCodeLink));
    setValidLive(URL_REGEX.test(form.liveLink));
    setValidTechStack(
      form.techStack.every((t) => TECH_STACK_ITEM_REGEX.test(t))
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "techStack") {
      setForm({
        ...form,
        techStack: value.split(",")
        .map((t) => t.trim())
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [
    form.id,
    form.title,
    form.duration,
    form.description,
    form.media,
    form.sourceCodeLink,
    form.liveLink,
    form.techStack,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = TITLE_REGEX.test(form.title);
    const v2 = DURATION_REGEX.test(form.duration);
    const v3 = DESCRIPTION_REGEX.test(form.description);
    const v4 = URL_REGEX.test(form.sourceCodeLink) || form.sourceCodeLink === "";
    const v5 = URL_REGEX.test(form.liveLink) || form.liveLink === "";
    const v6 = form.techStack.every((t) => TECH_STACK_ITEM_REGEX.test(t));

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      showError("Invalid Entry");
      return;
    }
    if (type === "Add") {
      try {
        const response = await axiosPrivate.post("/projects/create", form, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        showSuccess("Project added Successfully!");
        setSuccess(true);
      } catch (err) {
        showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);

        errRef.current.focus();
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
        onClose(false);
        onSave(response.data);
        showSuccess("Project updated Successfully!");
        setSuccess(true);
      } catch (err) {
        showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);
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
            ref={projectNameRef}
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
            value={form.techStack.join(", ")}
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

      <SuccessToast
        message={successMessage}
        show={showSuccessToast}
        status="success"
        icon={<FaCheckCircle className="text-green-600 text-4xl" />}
        iconBgColor="bg-green-700"
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

export default ProjectModal;
