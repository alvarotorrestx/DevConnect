import React from 'react'

const Forums = () => {
    return (
        <div className="md:display md:flex flex-col rounded-xl bg-base-100 shadow-md p-2">
            <div className="flex gap-2 justify-between w-full items-center mb-3">
                <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined   text-blue-800">
                        forum
                    </span>

                    <div className="font-bold">Forums</div>
                </div>
                <div className="text-blue-800">see All</div>
            </div>
            <div className="md:flex hidden md:display flex-col  gap-2">
                <div className="flex gap-2  shadow-md p-2">
                    <div className="left">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[40px] h-[40px] rounded-[40px]"
                        />
                    </div>
                    <div className="rights flex flex-col">
                        <span className="name font-semibold">Forum 1 Discussion</span>
                        <span className="time text-[12px]">20 people</span>
                    </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                    <div className="left">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[40px] h-[40px] rounded-[40px]"
                        />
                    </div>
                    <div className="rights flex flex-col">
                        <span className="name font-semibold">Forum 2 Discussion</span>
                        <span className="time text-[12px]">70 people</span>
                    </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                    <div className="left">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[40px] h-[40px] rounded-[40px]"
                        />
                    </div>
                    <div className="rights flex flex-col">
                        <span className="name font-semibold">Forum 3 DIscussion</span>
                        <span className="time text-[12px]">50 people</span>
                    </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                    <div className="left">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[40px] h-[40px] rounded-[40px]"
                        />
                    </div>
                    <div className="rights flex flex-col">
                        <span className="name font-semibold">Forum 4 Discussion</span>
                        <span className="time text-[12px]">33 people</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forums