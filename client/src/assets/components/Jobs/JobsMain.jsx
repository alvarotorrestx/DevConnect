// import { use,useEffect } from "react";
// import JobDescriptions from "./JobDescriptions";
// import JobList from "./JobList";
// import React from "react";
// const JobsMain = () => {
//     //const isMobile = window.innerWidth < 768;
//     const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         }
//          window.addEventListener('resize', handleResize);
//          handleResize();
//          return () =>  window.removeEventListener('resize', handleResize) },
//     []);
   
//     return (
//         <div className="w-[95%] mx-auto mt-5">
//             {/* Single grid container with 12 columns */}

//             {/* 4 left and 8 at right in  */}
//             <div className="grid grid-cols-12 gap-1">
//                 {isMobile?
//                 (<div className="joblist bg-base-100 w-[100%] mx-auto col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//                     <JobList/>
//                 </div>
//                 )
//                 :
//                 (<><div className="joblist bg-base-100 w-[100%] mx-auto col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
//                     <JobList/>
//                 </div>
//                 <div className=" bg-base-100 w-[100%] mx-auto rounded-md shadow-md jobdesc  col-span-8  p-4 overflow-y-auto h-[720px]">
//                 {/* job title ,company icon ,job location , description , about us , responsibility , requiremnet , offers , location, message from hr */}
//                     <JobDescriptions/>
//                 </div></>)
//             }
//             </div>
//         </div>
//     );
// };

// export default JobsMain;
import React, { useState, useEffect } from "react";
import JobDescriptions from "./JobDescriptions";
import JobList from "./JobList";

const JobsMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-[95%] mx-auto mt-5">
      <div className="grid grid-cols-12 gap-1">
        {isMobile ? (
          selectedJob ? (
            <div className="jobdesc bg-base-100 w-[100%] col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
              <button
                className="mb-4 text-blue-500 underline"
                onClick={() => setSelectedJob(null)}
              >
                ← Back to Job List
              </button>
              <JobDescriptions job={selectedJob} />
            </div>
          ) : (
            <div className="joblist bg-base-100 w-[100%] col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
              <JobList onJobSelect={setSelectedJob} />
            </div>
          )
        ) : (
          <>
            <div className="joblist bg-base-100 w-[100%] col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
              <JobList onJobSelect={setSelectedJob} />
            </div>
            <div className="jobdesc bg-base-100 w-[100%] col-span-8 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
              <JobDescriptions job={selectedJob} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobsMain;
