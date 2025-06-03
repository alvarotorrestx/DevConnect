import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import useAuth from '../../../auth/useAuth';
import Loading from '../subcomponents/Loading';
import { axiosPrivate } from '../../../api/axios';

function Activity() {
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

  const suggestedUsers = useMemo(() => {
    if (!auth || !auth.following || !users.length) return [];

    // Filter out users that is the current user and the user's following
    return [...users]
      .filter(user =>
        user._id !== auth.id && 
        !auth.following.includes(user._id)
      )
      // Randomizes filtered list and limits to 5 return
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [auth, users]);


  return (
    <div>
      <div className="bg-base-100 md:flex flex-col p-4 rounded-xl shadow-md sm:w-full">
        <div className="flex gap-2 justify-between w-full items-center mb-3 sm:w-full">
          <div className="flex gap-3 items-center justify-center">
            <span className="material-symbols-outlined text-primary">
              <FaUserFriends />
            </span>
            <div className="font-bold">People You May Know</div>
          </div>
        </div>
        <div className="md:flex flex-col gap-2">

          {loading
            ?
            <Loading />
            :
            (
              suggestedUsers.map((user, i) => (
                <div className="flex gap-2 shadow-md p-2" key={i}>
                  <div className="flex flex-row justify-between items-center w-full flex-wrap">
                    <Link to={`/profile/${user.username}`} className='flex flex-row justify-start items-center flex-wrap'>
                      <img
                        src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"}
                        alt=""
                        className="w-[45px] rounded-full"
                      />
                      <div className='flex flex-col ml-2'>
                        <span className="font-semibold">{`${user.firstName} ${user.lastName}`}</span>
                        <span className="text-[12px]">@{user.username}</span>
                      </div>
                    </Link>
                    <span className='link link-secondary link-hover text-lg p-2'><IoPersonAddSharp /></span>
                  </div>
                </div>
              ))
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Activity
