import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import Loading from '../subcomponents/Loading';

const Network = () => {
    const { auth } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                });
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [auth?.accessToken]);

    return (
        <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md">
            {loading
                ?
                <Loading />
                :
                (
                    users.map((user) => (
                        <div key={user._id} className="mb-4 p-4 border-b border-base-300">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>

                            <p><strong>Username:</strong> {user.username}</p>

                            <p><strong>Profile:</strong>{' '}
                                <Link
                                    to={`/profile/${user.username}`}
                                    className="link link-primary link-hover"
                                >
                                    View Profile
                                </Link>
                            </p>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default Network;
