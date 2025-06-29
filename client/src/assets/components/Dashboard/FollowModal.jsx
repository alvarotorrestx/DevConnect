import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import { useEffect, useState, useMemo } from 'react';
import Loading from '../subcomponents/Loading';
import { FaUserFriends, FaUserCheck } from "react-icons/fa";

const FollowModal = ({ open, onClose, modalType }) => {
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    // Caches fetched followers and following
    const followersFetched = useMemo(() => userFollowers.length > 0, [userFollowers]);
    const followingFetched = useMemo(() => userFollowing.length > 0, [userFollowing]);

    useEffect(() => {
        if (modalType === 'followers') {
            const fetchFollowers = async () => {
                if (!open || followersFetched) return;

                setLoading(true);
                try {
                    const response = await axiosPrivate.get('/api/users/followers', {
                        headers: {
                            Authorization: `Bearer ${auth?.accessToken}`,
                        },
                    });
                    setUserFollowers(response.data.userFollowers);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchFollowers();
        } else {
            const fetchFollowing = async () => {
                if (!open || followingFetched) return;

                setLoading(true);
                try {
                    const response = await axiosPrivate.get('/api/users/following', {
                        headers: {
                            Authorization: `Bearer ${auth?.accessToken}`,
                        },
                    });
                    setUserFollowing(response.data.userFollowing);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchFollowing();
        }

    }, [open, followersFetched, followingFetched, auth?.accessToken]);

    // Closes the dialog box on outside box click
    const handleBackdropClick = (e) => {
        if (e.target.tagName === 'DIALOG') onClose();
    };

    // Closes dialog box on esc button push
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open, onClose]);

    return (
        <dialog
            id="followers"
            className="modal bg-black/40"
            open={open}
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className="modal-box max-w-xl bg-base-200 rounded-box shadow p-4 pt-1 menu">
                <h1 className="text-lg font-bold p-2 py-3 flex flex-row items-center justify-start gap-2">
                    {modalType === 'followers' ? (
                        <>
                            <FaUserFriends className="text-xl" />
                            Followers
                        </>
                    ) : (
                        <>
                            <FaUserCheck className="text-xl" />
                            Following
                        </>
                    )}
                </h1>

                <ul className='bg-base-300 rounded-box max-h-[400px] overflow-y-auto'>
                    {loading ? (
                        <Loading />
                    ) : (modalType === 'followers' ? userFollowers.length === 0 : userFollowing.length === 0) ? (
                        <div className="flex items-center justify-between text-md p-4 hover:bg-base-200 transition rounded-md">
                            <div className="flex justify-between gap-2 items-center">
                                <li>
                                    {modalType === 'followers' ? "No followers yet." : "Not following anyone yet."}
                                </li>
                            </div>
                        </div>
                    ) : (modalType === 'followers') ? (
                        userFollowers.map((follower, i) => (
                            <li key={i} className="first:rounded-t-box last:rounded-b-box overflow-hidden">
                                <Link to={`/profile/${follower.username}`} className='flex items-center justify-between text-sm p-[unset] px-2 py-4'>
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="avatar">
                                            {/* LEAVE THIS FOR WHEN STORIES FEATURE IS ADDED <div className="ring-primary ring-offset-base-100 ring-2 ring-offset-2 w-8 rounded-full"> */}
                                            <div className="w-6 md:w-8 rounded-full">
                                                <img src={follower.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"} alt={follower.username} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start justify-center'>
                                            <span className='font-bold'>{follower.firstName} {follower.lastName}</span>
                                            <span className='text-xs'>@{follower.username}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        userFollowing.map((follower, i) => (
                            <li key={i} className="first:rounded-t-box last:rounded-b-box overflow-hidden">
                                <Link to={`/profile/${follower.username}`} className='flex items-center justify-between text-sm p-[unset] px-2 py-4'>
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="avatar">
                                            {/* LEAVE THIS FOR WHEN STORIES FEATURE IS ADDED <div className="ring-primary ring-offset-base-100 ring-2 ring-offset-2 w-8 rounded-full"> */}
                                            <div className="w-6 md:w-8 rounded-full">
                                                <img src={follower.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"} alt={follower.username} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start justify-center'>
                                            <span className='font-bold'>{follower.firstName} {follower.lastName}</span>
                                            <span className='text-xs'>@{follower.username}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </dialog>
    );
};

export default FollowModal;
