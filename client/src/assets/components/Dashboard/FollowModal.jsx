import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import { useEffect, useState, useMemo } from 'react';
import Loading from '../subcomponents/Loading';
import { FaUserFriends } from "react-icons/fa";

const FollowModal = ({ open, onClose }) => {
    const [userFollowers, setUserFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const followersFetched = useMemo(() => userFollowers.length > 0, [userFollowers]);

    useEffect(() => {
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
    }, [open, followersFetched, auth?.accessToken]);

    return (
        <dialog
            id="followers"
            className="modal bg-black/40"
            open={open}
            onClose={onClose}
            onClick={(e) => {
                if (e.target.tagName === 'DIALOG') onClose();
            }}
        >
            <div className="modal-box max-w-xl bg-base-200 rounded-box shadow p-4 pt-1 menu">
                <h1 className="text-lg font-bold p-2 py-3 flex flex-row items-center justify-start gap-2">
                    <FaUserFriends className="text-xl" />Followers
                </h1>

                <ul className='bg-base-300 rounded-box max-h-[400px] overflow-y-auto'>
                    {loading ? (
                        <Loading />
                    ) : userFollowers.length === 0 ? (
                        <div className="flex items-center justify-between text-md p-4 hover:bg-base-200 transition rounded-md">
                            <div className="flex justify-between gap-2 items-center">
                                <li>
                                    No followers yet.
                                </li>
                            </div>
                        </div>
                    ) : (
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
                                    {/* <p>
                                        <Link
                                            to={`/profile/${follower.username}`}
                                            className="link link-primary link-hover"
                                        >
                                            View Profile
                                        </Link>
                                    </p> */}
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
