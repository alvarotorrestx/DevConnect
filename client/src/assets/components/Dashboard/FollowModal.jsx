import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import { useEffect, useState, useMemo } from 'react';
import Loading from '../subcomponents/Loading';

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
            className="modal"
            open={open}
            onClose={onClose}
            onClick={(e) => {
                if (e.target.tagName === 'DIALOG') onClose();
            }}
        >
            <div className="modal-box max-w-2xl bg-base-100 rounded-lg shadow p-6">
                <h3 className="font-bold text-xl mb-4">Followers</h3>
                {loading ? (
                    <Loading />
                ) : userFollowers.length === 0 ? (
                    <p className="text-center">No followers yet.</p>
                ) : (
                    userFollowers.map((follower) => (
                        <div key={follower._id} className="mb-4 p-4 border-b border-base-300">
                            <p>
                                <strong>Name:</strong> {follower.firstName} {follower.lastName}
                            </p>
                            <p>
                                <strong>Username:</strong> {follower.username}
                            </p>
                            <p>
                                <Link
                                    to={`/profile/${follower.username}`}
                                    className="link link-primary link-hover"
                                >
                                    View Profile
                                </Link>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </dialog>
    );
};

export default FollowModal;
