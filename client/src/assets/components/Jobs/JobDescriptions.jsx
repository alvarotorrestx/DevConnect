const dummyjob_desc = {
    icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
    jobTitle: "Backend Developer",
    companyName: "Google",
    postedAt: "",
    location: "Bangaluru , India (Onsite)",
    tags: 'remote,fulltime,java,node,python,react,angular,remote,fulltime,java,node,python,react,angular,remote,fulltime,java,node,python,react,angular',
    aboutJob: '',//suppose to be an html document
    budgetRange: '',
    postedBy: { //populated by user id suppose to be hr
        name: '',
        icon: ''
    },
    companyDetails: {
        companyName: "Google",
        noOfEmployeers: 300,
        noOfFollowers: 9039,
        type: "Software products",
        descriptions: "Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence."
    }
}
const JobDescriptions = () => {
    return (
        <div className="grid p-5 gap-y-6"> {/* Increased gap-y to 6 for better spacing */}
    {/* Company icon and name */}
    <div className="top-details flex flex-row gap-2 items-center">
        <img src={dummyjob_desc.icon} className="h-[40px] w-[40px]" />
        <p className="m-0 font-bold">{dummyjob_desc.companyName}</p>
    </div>
    
    <div className="job-title">
        <p className="font-bold font-roboto text-3xl m-0">{dummyjob_desc.jobTitle}</p>
    </div>
    
    <div className="loc-time">
        <p className="m-0">{dummyjob_desc.location} - {dummyjob_desc.postedAt}</p>
    </div>
    
    {/* apply and save */}
    <div className="btn-grp flex flex-row gap-2">
        <button className="p-2 w-40 bg-primary text-white rounded-full">Apply</button>
        <button className="p-2 w-40 bg-primary text-white rounded-full">Save</button>
    </div>
    
    <div className="pills">
        <div className="flex flex-wrap gap-2"> {/* Changed to flex-wrap for better tag handling */}
            {dummyjob_desc.tags.split(",").map((x) => (
                <span className="bg-blue-100 text-white font-medium px-2.5 py-0.5 rounded-full dark:bg-white dark:text-black">{x}</span>
            ))}
        </div>
    </div>

    <div className="about-section">
        <p className="text-3xl font-semibold mb-4">About the Job</p> {/* Added mb-4 */}
        <p className="text-lg m-0"> {/* Added m-0 */}
            {dummyjob_desc.jobDescription}
        </p>
    </div>

    <div className="about-company">
        {/* Heading */}
        <p className="text-2xl font-semibold mb-4">About Company</p> {/* Added mb-4 */}

        {/* Company Details Row */}
        <div className="companydetails flex flex-row items-center justify-between w-full mb-4"> {/* Added mb-4 */}
            {/* Left: Icon + Company Name */}
            <div className="flex flex-row items-center space-x-4">
                <img
                    src={dummyjob_desc.icon}
                    alt="Company Icon"
                    className="h-20 w-20 object-contain"
                />
                <p className="text-3xl m-0">{dummyjob_desc.companyDetails.companyName}</p>
            </div>

            {/* Right: Follow Button */}
            <button className="p-2 w-40 bg-primary text-white rounded-full">
                Follow
            </button>
        </div>

        <div className="about-company text-lg">
            <p className="m-0">{dummyjob_desc.companyDetails.descriptions}</p> {/* Added m-0 */}
        </div>
    </div>
</div>
    )
}

export default JobDescriptions;