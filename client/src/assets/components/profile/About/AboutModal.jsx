import { useState } from "react";

function AboutModal({ initialContent, onClose, onSave, username }) {
  const [text, setText] = useState(initialContent || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-base-200 p-4 sm:p-8 rounded-xl shadow-xl w-[95%] max-w-2xl relative">
        <h2 className="text-2xl font-semibold text-base-content mb-4">Edit About</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="textarea textarea-bordered w-full bg-base-100 text-base-content"
            placeholder="Write about yourself..."
          ></textarea>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutModal;
