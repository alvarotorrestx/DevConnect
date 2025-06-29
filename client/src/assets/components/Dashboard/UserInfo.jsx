import { useState } from 'react'
import useAuth from '../../../auth/useAuth'
import { Link } from 'react-router-dom';
import FollowModal from './FollowModal';

const UserInfo = () => {
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState();

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
                <div className="flex flex-col text-center cursor-pointer" onClick={() => {
                    setOpen(true);
                    setModalType('followers')
                }}>
                    <div className="font-extrabold">{auth?.followers?.length ?? 0}</div>
                    <div className="">Followers</div>
                </div>
                <div className="flex flex-col text-center cursor-pointer" onClick={() => {
                    setOpen(true);
                    setModalType('following')
                }}>
                    <div className="font-extrabold">{auth?.following?.length ?? 0}</div>
                    <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-extrabold">{auth?.totalPosts?.length ?? 0}</div>
                    <div>Posts</div>
                </div>
            </div>

            {/* Modal */}
            <FollowModal open={open} onClose={() => setOpen(false)} modalType={modalType} />
        </div>
    )
}

export default UserInfo