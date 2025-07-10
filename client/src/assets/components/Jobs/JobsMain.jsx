// import React, { useState, useEffect } from "react";
// import JobDescriptions from "./JobDescriptions";
// import JobList from "./JobList";

// const JobsMain = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [selectedJob, setSelectedJob] = useState(null);

//   // useEffect(() => {
//   //   const handleResize = () => setIsMobile(window.innerWidth < 768);
//   //   window.addEventListener("resize", handleResize);
//   //   return () => window.removeEventListener("resize", handleResize);
//   // }, []);

//   // return (
//   //   <div className="w-[95%] mx-auto mt-5">
//   //     <div className="grid grid-cols-12 gap-1">
//   //       {isMobile ? (
//   //         selectedJob ? (
//   //           <div className="jobdesc bg-base-100 w-[100%] col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//   //             <button
//   //               className="mb-4 text-blue-500 underline"
//   //               onClick={() => setSelectedJob(null)}
//   //             >
//   //               ← Back to Job List
//   //             </button>
//   //             <JobDescriptions job={selectedJob} />
//   //           </div>
//   //         ) : (
//   //           <div className="joblist bg-base-100 w-[100%] col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//   //             <JobList onJobSelect={setSelectedJob} />
//   //           </div>
//   //         )
//   //       ) : (
//   //         <>
//   //           <div className="joblist bg-base-100 w-[100%] col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//   //             <JobList onJobSelect={setSelectedJob} />
//   //           </div>
//   //           <div className="jobdesc bg-base-100 w-[100%] col-span-8 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//   //             <JobDescriptions job={selectedJob} />
//   //           </div>
//   //         </>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="w-[95%]" mx-auto mt-5>
//       <div className={`joblist bg-base-100 w-full md:col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px] ${selectedJob ? "hidden md:block" : "block"}`}>
//         <JobList onJobSelect={setSelectedJob} />
//       </div>
//       <div className={`jobdesc bg-base-100 w-full md:col-span-8 rounded-md shadow-md p-4 overflow-y-auto h-[720px] ${selected ? "block":"hidden md:block"}`}>
//           {selectedJob && (
//             <button className="mb-4 text-blue-500 underline md:hidden" onClick={()=>setSelectedJob(null)}>
//               back
//             </button> 
//           )}
//       </div>
//     </div>
//   )
// };

// export default JobsMain;
import React, { useState } from "react";
import JobDescriptions from "./JobDescriptions";
import JobList from "./JobList";

const JobsMain = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="w-[95%] mx-auto mt-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
        {/* JOB LIST SECTION */}
        <div
          className={`joblist bg-base-100 w-full md:col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px] ${
            selectedJob ? "hidden md:block" : "block"
          }`}
        >
          <JobList onJobSelect={setSelectedJob} />
        </div>

       {/* JOB DESC */}
        <div
          className={`jobdesc bg-base-100 w-full md:col-span-8 rounded-md shadow-md p-4 overflow-y-auto h-[720px] ${
            selectedJob ? "block" : "hidden md:block"
          }`}
        >
          {selectedJob && (
            <button
              className="mb-4 text-blue-500 underline md:hidden"
              onClick={() => setSelectedJob(null)}
            >
              ← Back to Job List
            </button>
          )}
          <JobDescriptions job={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default JobsMain;