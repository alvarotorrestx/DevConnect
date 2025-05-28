const jobs = [
    {
        _id: "93",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Node.js Developer",
        companyName: "Microsoft",
        postedAt: "6/4/2025",
        location: "Hyderabad, India (Hybrid)",
    },
    {
        _id: "94",
        icon: "",
        jobTitle: "Senior Backend Engineer",
        companyName: "Amazon",
        postedAt: "6/4/2025",
        location: "Chennai, India (Remote)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Software Engineer - Backend",
        companyName: "Flipkart",
        postedAt: "6/4/2025",
        location: "Bengaluru, India (Onsite)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Backend Developer",
        companyName: "Infosys",
        postedAt: "6/4/2025",
        location: "Pune, India (Hybrid)",
    },
    {
        _id: "96",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Backend Developer",
        companyName: "Google",
        postedAt: "",
        location: "Bangaluru , India (Onsite)",
    },
    {
        _id: "93",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Node.js Developer",
        companyName: "Microsoft",
        postedAt: "6/4/2025",
        location: "Hyderabad, India (Hybrid)",
    },
    {
        _id: "94",
        icon: "",
        jobTitle: "Senior Backend Engineer",
        companyName: "Amazon",
        postedAt: "6/4/2025",
        location: "Chennai, India (Remote)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Software Engineer - Backend",
        companyName: "Flipkart",
        postedAt: "6/4/2025",
        location: "Bengaluru, India (Onsite)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Backend Developer",
        companyName: "Infosys",
        postedAt: "6/4/2025",
        location: "Pune, India (Hybrid)",
    },
    {
        _id: "96",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Backend Developer",
        companyName: "Google",
        postedAt: "",
        location: "Bangaluru , India (Onsite)",
    },
    {
        _id: "93",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Node.js Developer",
        companyName: "Microsoft",
        postedAt: "6/4/2025",
        location: "Hyderabad, India (Hybrid)",
    },
    {
        _id: "94",
        icon: "",
        jobTitle: "Senior Backend Engineer",
        companyName: "Amazon",
        postedAt: "6/4/2025",
        location: "Chennai, India (Remote)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Software Engineer - Backend",
        companyName: "Flipkart",
        postedAt: "6/4/2025",
        location: "Bengaluru, India (Onsite)",
    },
    {
        _id: "95",
        icon: "",
        jobTitle: "Backend Developer",
        companyName: "Infosys",
        postedAt: "6/4/2025",
        location: "Pune, India (Hybrid)",
    },
    {
        _id: "96",
        icon: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        jobTitle: "Backend Developer",
        companyName: "Google",
        postedAt: "",
        location: "Bangaluru , India (Onsite)",
    }
]


const JobList = () => {
    return (
        // <div className="bg-base-100 w-[100%] mx-auto rounded-md shadow-md">
        //         {/* List container */}
        //         {jobs.map((x)=>(
        //             <ul className="space-y-2 bg-base-100">  {/* Adds spacing between list items */}
        //             {/* List item */}
        //             <li className="flex gap-3 shadow-md p-2">
        //                 <div className="left">
        //                     <img
        //                         src={x.icon}
        //                         alt="https://img.icons8.com/?size=100&id=4pNZwCiLSsRv&format=png&color=000000"
        //                         className="w-[60px] h-[60px]"
        //                     />
        //                 </div>
        //                 <div className="rights flex flex-col">
        //                     <span className="name font-semibold">{x.jobTitle}</span>
        //                     <span className="time text-[12px]">{x.companyName}</span>
        //                     <span className="time text-[12px]">{x.postedAt}</span>
        //                     <span className="time text-[12px]">{x.location}</span>
        //                 </div>
        //             </li>

        //             {/* You can add more list items here */}
        //         </ul>

        //         ))}


        // </div>
        <div className="">
            {/* List container */}
            <ul className="space-y-2 bg-base-100">
                {jobs.map((x) => (
                    <li key={x.id} className="flex gap-3 shadow-md p-2">
                        <div className="left">
                            <img
                                src={x.icon}
                                alt="Job icon"
                                className="w-[60px] h-[60px]"
                            />
                        </div>
                        <div className="rights flex flex-col">
                            <span className="name font-semibold">{x.jobTitle}</span>
                            <span className="time text-[12px]">{x.companyName}</span>
                            <span className="time text-[12px]">{x.postedAt}</span>
                            <span className="time text-[12px]">{x.location}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default JobList;