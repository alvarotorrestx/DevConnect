import React from 'react'

const UserInfo = () => {
    return (
        <div className="flex  flex-col gap-2   rounded-xl h-auto align-center   shadow-md bg-base-200 border-[2px]">
            <div className="flex align-center text-align w-auto gap-2 pt-2 ml-5">
                <div className="image w-[45px] h-[45px] flex align-center">
                    <img
                        className="w-full h-full  rounded-full object-cover"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="profile-img"
                    />
                </div>
                <div className="username">
                    <div className="flex gap-1">
                        <h2 className="text-black-900 font-extrabold text-xl">John David</h2>
                        <p>
                            <span className="material-symbols-outlined text-blue-700">
                                verified
                            </span>
                        </p>
                    </div>

                    <h2>@justin098</h2>
                </div>
            </div>

            <div className="flex lg:flex-row gap-5  align-center  mb-2 w-auto ml-5  md:flex-wrap  ">
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">2.3k</div>
                    <div className="">Followers</div>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">890</div>
                    <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">80</div>
                    <div>Post</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo