import JobDescriptions from "./JobDescriptions";
import JobList from "./JobList";

const JobsMain = () => {
    const isMobile = window.innerWidth < 768;
    console.log("+===================================>",isMobile)
    return (
        <div className="w-[95%] mx-auto mt-5">
            {/* Single grid container with 12 columns */}

            {/* 4 left and 8 at right in  */}
            <div className="grid grid-cols-12 gap-1">
                {isMobile?
                (<div className="joblist bg-base-100 w-[100%] mx-auto col-span-12 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
                    <JobList/>
                </div>
                )
                :
                (<><div className="joblist bg-base-100 w-[100%] mx-auto col-span-4 rounded-md shadow-md p-4 overflow-y-auto h-[720px]">
                    <JobList/>
                </div>
                <div className=" bg-base-100 w-[100%] mx-auto rounded-md shadow-md jobdesc  col-span-8  p-4 overflow-y-auto h-[720px]">
                {/* job title ,company icon ,job location , description , about us , responsibility , requiremnet , offers , location, message from hr */}
                    <JobDescriptions/>
                </div></>)
            }
            </div>
        </div>
    );
};

export default JobsMain;