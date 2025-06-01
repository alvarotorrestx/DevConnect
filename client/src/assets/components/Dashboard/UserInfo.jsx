import React from 'react'
import useAuth from '../../../auth/useAuth'
import { Link } from 'react-router-dom';

const UserInfo = () => {

    const { auth } = useAuth();

    return (
        <div className="flex  flex-col gap-2 rounded-xl h-auto align-center shadow-md bg-base-100 p-4">
            <div className="flex align-center text-align w-auto gap-2">
                <div className="w-[45px] h-[45px] flex align-center">
                    <Link to={'/profile/' + auth?.username}>
                        <img
                            className="w-full h-full rounded-full object-scale-down lg:object-cover"
                            src={auth?.avatar}
                            alt="profile-img"
                        />
                    </Link>
                </div>
                <div className="ml-2">
                    <div className="flex gap-1">
                        <h2 className="text-black-900 font-extrabold text-xl">{`${auth?.firstName} ${auth?.lastName}`}</h2>
                    </div>

                    <h2><Link to={'/profile/' + auth?.username} className="link link-primary link-hover">@{auth?.username}</Link></h2>
                </div>
            </div>

            <div className="flex lg:flex-row justify-around gap-5 align-center w-auto md:flex-wrap">
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">{auth?.totalFollowers ?? 0}</div>
                    <div className="">Followers</div>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">{auth?.totalFollowing ?? 0}</div>
                    <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">{auth?.totalPosts?.length ?? 0}</div>
                    <div>Posts</div>
                </div>
            </div>
        </div >
    )
}

export default UserInfo