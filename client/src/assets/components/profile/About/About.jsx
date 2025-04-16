// components/profile/About/About.jsx
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AboutModal from "./AboutModal";

function About() {
  const [showMore, setShowMore] = useState(false);
  const [aboutContent, setAboutContent] = useState(
    `Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure quidem voluptatibus sequi odio maiores adipisci nihil quaerat praesentium, ducimus at saepe reiciendis ratione blanditiis voluptatem molestiae dolor...`
  );
  const [showModal, setShowModal] = useState(false);

  const handleSave = (newContent) => {
    setAboutContent(newContent);
    setShowModal(false);
  };

  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10 relative">
      <div className="flex pb-4 items-center justify-between font-semibold">
        <h1>About</h1>
        <div
         className="text-2xl bg-base-300 p-[7px] rounded-3xl flex items-center justify-center gap-5 cursor-pointer opacity-75 hover:opacity-100 transition text-primary"
          onClick={() => setShowModal(true)} style={{
            
          }}
        >
          <FaEdit />
        </div>
      </div>
      <div className="bg-base-300 rounded-lg p-4">
        <h3 className="whitespace-pre-line">
          {showMore
            ? aboutContent
            : aboutContent.split(" ").slice(0, 40).join(" ") + "..."}
        </h3>
        {aboutContent.split(" ").length > 40 && (
          <button
            className="mt-2 text-sm text-blue-500 hover:underline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "See less" : "See more"}
          </button>
        )}
      </div>

      {showModal && (
        <AboutModal
          initialContent={aboutContent}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default About;
