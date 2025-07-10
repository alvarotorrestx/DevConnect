import React, { useState } from "react";
import JobDescriptions from "./JobDescriptions";
import JobList from "./JobList";
import { IoArrowBackOutline } from "react-icons/io5";

const JobsMain = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="w-[95%] mx-auto mt-5 h-[500px]"> {/* <-- Add h-[720px] here */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 h-full">
        {/* Job List: Hidden on mobile when a job is selected, visible otherwise */}
        <div
          className={`joblist bg-base-100 w-full md:col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-full ${selectedJob ? "hidden md:block" : "block"
            }`}
        >
          <JobList onJobSelect={setSelectedJob} />
        </div>

        {/* Job Description: Visible on mobile when a job is selected, always visible on larger screens */}
        <div
          className={`jobdesc bg-base-100 w-full md:col-span-8 rounded-md shadow-md p-4 overflow-y-auto h-full ${selectedJob ? "block" : "hidden md:block"
            }`}
        >
          {selectedJob && (
            <button
              className="mb-4 text-blue-500 underline md:hidden flex items-center gap-2"
              onClick={() => setSelectedJob(null)}
            >
              <IoArrowBackOutline /> back
            </button>
          )}
          <JobDescriptions job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default JobsMain;