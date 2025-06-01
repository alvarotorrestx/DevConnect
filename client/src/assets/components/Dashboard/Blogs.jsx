import React from 'react'

const Forums = () => {
    return (
        <div className="md:display md:flex flex-col p-4 rounded-xl bg-base-100 shadow-md">
            <div className="flex gap-2 justify-between w-full items-center mb-3">
                <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary">
                        forum
                    </span>

                    <div className="font-bold">Recent Blogs</div>
                </div>
                <div className="link link-primary link-hover">View All</div>
            </div>
            <div className="md:flex hidden md:display flex-col  gap-2">

                <div className="flex gap-2 shadow-md p-2">
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[45px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full flex-wrap">
                        <div className='flex flex-col'>
                            <span className="name font-semibold">Clean up your resume</span>
                            <span className="time text-[12px]">20 comments</span>
                        </div>
                        <span className='link link-secondary link-hover text-sm p-2'>View</span>
                    </div>
                </div>

                <div className="flex gap-2 shadow-md p-2">
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[45px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full flex-wrap">
                        <div className='flex flex-col'>
                            <span className="name font-semibold">React v20.5</span>
                            <span className="time text-[12px]">5 comments</span>
                        </div>
                        <span className='link link-secondary link-hover text-sm p-2'>View</span>
                    </div>
                </div>

                <div className="flex gap-2 shadow-md p-2">
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[45px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full flex-wrap">
                        <div className='flex flex-col'>
                            <span className="name font-semibold">MERN Stack</span>
                            <span className="time text-[12px]">15 comments</span>
                        </div>
                        <span className='link link-secondary link-hover text-sm p-2'>View</span>
                    </div>
                </div>

                <div className="flex gap-2 shadow-md p-2">
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                            alt=""
                            className="w-[45px] rounded-full"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-full flex-wrap">
                        <div className='flex flex-col'>
                            <span className="name font-semibold">How to train a dragon</span>
                            <span className="time text-[12px]">33 comments</span>
                        </div>
                        <span className='link link-secondary link-hover text-sm p-2'>View</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Forums