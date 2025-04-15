// components/profile/About/AboutModal.jsx
import { useState } from "react";

function AboutModal({ initialContent, onClose, onSave }) {
  const [text, setText] = useState(initialContent || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit About</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="textarea textarea-bordered w-full"
            placeholder="Write about yourself..."
          ></textarea>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost text-red-500"
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
