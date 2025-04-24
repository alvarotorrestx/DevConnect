import React, { useEffect, useState } from "react";

const slides = [
    {
        title: "Profile",
        component: (
            <div className="p-2 mx-2 mt-4 flex flex-col gap-5 border-[15px] border-white rounded-md bg-[#ffffff]">
                <div className="flex bg-white justify-center gap-[80px]">
                    <div className="left flex flex-col justify-center items-center">
                        <img
                            className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-full object-cover"
                            src="https://i.pravatar.cc/150?img=3"
                            alt="profile-img"
                        />
                        <div>
                            <h2 className="text-blue-900 font-bold text-2xl">John David</h2>
                            <h2 className="text-xl text-[#222b]">@justin098</h2>
                        </div>
                    </div>
                    <div className="right flex flex-col gap-6">

                        <div className="flex gap-10">
                            {[
                                { label: "Followers", value: "2.3k" },
                                { label: "Following", value: "890" },
                                { label: "Post", value: "80" },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="font-extrabold">{item.value}</div>
                                    <div>{item.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="font-semibold">
                                Actively looking for Internship Opportunity
                            </h1>
                            <h1>
                                <span className="font-bold">Skills:</span> React, Next.js, HTML, CSS
                            </h1>
                            <button className="bg-[#e4e4e4d6] mb-4 shadow-lg p-1 px-2 rounded-md mt-2">
                                View Full Profile
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        ),
    },
    {
        title: "Activity",
        component: (
            <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2 items-center">
                        <span className="material-symbols-outlined text-blue-800">timeline</span>
                        <div className="font-bold">Activity</div>
                    </div>
                    <div className="text-blue-800 cursor-pointer">See All</div>
                </div>
                <div className="space-y-3">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 border p-2 rounded shadow-sm">
                            <img
                                src="https://i.pravatar.cc/150?img=5"
                                alt="activity"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-semibold">Cipta</div>
                                <div className="text-xs text-gray-500">33 seconds ago</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Messages",
        component: (
            <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Messages</h2>
                    <span className="material-symbols-outlined">edit_square</span>
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="my-3 w-full p-2 border rounded"
                />
                <div className="flex justify-between text-sm mb-2">
                    <div className="flex gap-5">
                        <div className="font-bold border-b-2 border-black ">Primary</div>
                        <div>General</div>
                    </div>

                    <div className="text-blue-500 font-semibold">FriendReq(4)</div>
                </div>
                <div className="space-y-3">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/150?img=6"
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="name">Bob</div>
                        </div>
                    ))}
                    <div className="text-center text-blue-600 cursor-pointer">View All</div>
                </div>
            </div>
        ),
    },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        }
        else if (newIndex >= slides.length) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);
    }

    return (
        <div className="w-full h-[350px] bg-gray-100 rounded-xl shadow-lg overflow-hidden block lg:hidden ">
            <div className="h-[310px] px-5 pt-5 overflow-y-auto"
            >

                {slides[currentIndex].component}

            </div>


            <div className="flex justify-center mt-3">
                <>
                    <button onClick={() => {
                        updateIndex(currentIndex - 1)
                    }}>
                        <span className='material-symbols-outlined '>
                            chevron_left
                        </span>
                    </button>
                    <div className="indicators">
                        {slides.map((item, index) => {
                            return (
                                <button className={`indicator-buttonsh-3  mx-1 rounded-full transition-all ${index === currentIndex ? 'text-blue-500' : 'text-red-300'
                                    }`}
                                    onClick={() => {
                                        updateIndex(index)
                                    }}>
                                    <span class="material-symbols-outlined">
                                        radio_button_checked
                                    </span>
                                </button>
                            )
                        })}

                    </div>
                    <button onClick={() => {
                        updateIndex(currentIndex + 1)
                    }}>
                        <span className="material-symbols-outlined cursor-pointer">
                            chevron_right
                        </span>
                    </button>

                </>

            </div>
        </div>
    );
};

export default Carousel;