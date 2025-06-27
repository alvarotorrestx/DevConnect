import { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom'
import useLogout from "../../../auth/useLogout";
import { motion, AnimatePresence } from 'framer-motion'

// Icon Imports
import { IoMdHome } from "react-icons/io";
import { HiNewspaper } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import { GiSuitcase } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp, IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdCheck } from 'react-icons/md';

// Context Imports
import ThemeContext from "../../context/ThemeContext";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import { useSocket } from "../../context/SocketContext";

const NavBar = ({ avatar, username, notifications }) => {

    const { auth, setAuth } = useAuth();

    const { darkMode, actions } = useContext(ThemeContext)

    const profileURL = `/profile/${username}`;

    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleMarkAsRead = async (notificationId) => {
        try {
            const response = await axiosPrivate.patch(`/system/notifications/${notificationId}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`
                }
            });

            // Update auth state to reflect change
            setAuth(prev => ({
                ...prev,
                notifications: prev.notifications.map(notification =>
                    notification._id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            }));
        }
        catch (err) {
            console.error("Failed to mark notification as read.", err);
        }
    }

    // Socket updates for incoming notifications
    const socket = useSocket();

    useEffect(() => {
        const handleNewNotification = (noti) => {
            setAuth(prev => ({
                ...prev,
                notifications: [noti, ...prev.notifications],
            }));
        };

        const handleRemoveNotification = (noti) => {
            setAuth(prev => ({
                ...prev,
                notifications: prev.notifications.filter(n => n._id !== noti._id),
            }));
        };

        if (socket) {
            socket.on('new-notification', handleNewNotification);
            socket.on('remove-notification', handleRemoveNotification);
        }

        return () => {
            if (socket) {
                socket.off('new-notification', handleNewNotification);
                socket.off('remove-notification', handleRemoveNotification);
            }
        };
    }, [socket]);


    return (
        <div className="navbar bg-base-100 w-[95%] mx-auto rounded-lg shadow-md grid grid-cols-2 lg:grid-cols-4 auto-cols-max relative mb-5">

            {/* Nav start */}
            <div className="navbar-start w-[unset] lg:col-span-1">

                {/* Mobile Nav */}
                <div className="dropdown static">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 p-2 shadow w-[95%]">
                        <li><NavLink to='/dashboard' className='py-4 flex items-center'><span className="text-xl text-primary"><IoMdHome /></span>Home</NavLink></li>
                        <li><NavLink to='' className='py-4 flex items-center'><span className="text-xl text-primary"><HiNewspaper /></span>Blogs</NavLink></li>
                        <li><NavLink to='/network' className='py-4 flex items-center'><span className="text-xl text-primary"><IoMdPeople /></span>Network</NavLink></li>
                        <li><NavLink to='' className='py-4 flex items-center'><span className="text-xl text-primary"><GiSuitcase /></span>Jobs</NavLink></li>
                    </ul>
                </div>

                {/* DevConnect Link */}
                <Link to='/' className="btn btn-ghost text-xl rounded-lg">DevConnect</Link>
            </div>

            {/* Desktop Nav */}
            <div className="navbar-center hidden lg:flex w-[unset] justify-center lg:col-span-2">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/dashboard' className="flex items-center"><span className="text-xl text-primary"><IoMdHome /></span>Home</NavLink></li>
                    <li><NavLink to='' className="flex items-center"><span className="text-xl text-primary"><HiNewspaper /></span>Blogs</NavLink></li>
                    <li><NavLink to='/network' className="flex items-center"><span className="text-xl text-primary"><IoMdPeople /></span>Network</NavLink></li>
                    <li><NavLink to='' className="flex items-center"><span className="text-xl text-primary"><GiSuitcase /></span>Jobs</NavLink></li>
                </ul>
            </div>

            {/* Nav End */}
            <div className="navbar-end flex-none md:gap-2 w-[unset] lg:col-span-1">

                {/* Search Icon */}
                <button className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>


                {/* Notifications */}
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => setShowDropdown(prev => !prev)}
                    ref={buttonRef}
                >
                    <div className="indicator">
                        {notifications?.some(notification => !notification.read)
                            ?
                            <>
                                <IoNotificationsSharp className="text-xl" />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </>
                            :
                            <IoNotificationsOutline className="text-xl" />
                        }
                    </div>
                </button>
                <div
                    className='absolute top-0 right-0 mt-[4.4rem] lg:mt-[4.55rem] flex flex-wrap flex-row-reverse justify-between items-center'
                >
                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className='absolute top-0 right-0 bg-base-200 rounded-box shadow z-50 w-fit min-w-[275px] md:min-w-[450px] text-xs md:text-sm/5 menu'
                                ref={dropdownRef}
                            >
                                <h1 className="text-lg font-bold p-2 flex flex-row items-center justify-start gap-2"><IoNotificationsSharp className="text-xl" />Notifications</h1>
                                <ul className="bg-base-300 rounded-box">
                                    {notifications && notifications.length > 0
                                        ?
                                        notifications.map((notification, i) => {
                                            const type = notification.type;
                                            const username = notification?.from?.username;

                                            // Default path fallback
                                            let linkTo = '#';

                                            if (type === 'follow' && username) {
                                                linkTo = `/profile/${username}`;
                                            }

                                            return (
                                                <li key={i} className="first:rounded-t-box last:rounded-b-box overflow-hidden">
                                                    <Link
                                                        to={linkTo}
                                                        onClick={() => {
                                                            if (!notification.read && linkTo !== '#') {
                                                                handleMarkAsRead(notification._id);
                                                            }
                                                        }}
                                                        className={`flex items-center justify-between text-md p-[unset] px-2 py-4
                                                ${!notification.read && 'nav-li-hover'}`}
                                                    >
                                                        <div className="flex justify-between gap-2 items-center">
                                                            <div className="avatar">
                                                                {/* LEAVE THIS FOR WHEN STORIES FEATURE IS ADDED <div className="ring-primary ring-offset-base-100 ring-2 ring-offset-2 w-8 rounded-full"> */}
                                                                <div className="w-6 md:w-8 rounded-full">
                                                                    <img src={notification?.from?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"} alt={username} />
                                                                </div>
                                                            </div>
                                                            <span>{notification.message}</span>
                                                        </div>
                                                        <button
                                                            className={`text-xs transition hover:text-primary capitalize ${notification.read && 'hidden'}`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleMarkAsRead(notification._id)
                                                            }}
                                                        >
                                                            <MdCheck className="text-lg md:text-xl" />
                                                        </button>

                                                    </Link>
                                                </li>
                                            )
                                        })
                                        :
                                        <div className="flex items-center justify-between text-md p-4 hover:bg-base-200 transition rounded-md">
                                            <div className="flex justify-between gap-2 items-center">
                                                <li>
                                                    No new notifications.
                                                </li>
                                            </div>
                                        </div>
                                    }
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile Avatar and Menu */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={avatar}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            {/* Theme Switcher */}
                            <label className="flex cursor-pointer gap-2 text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>
                                <input
                                    type="checkbox"
                                    checked={darkMode ? true : false}
                                    value="synthwave"
                                    className="toggle theme-controller rounded-full"
                                    onChange={() => actions.toggleTheme()}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </label>
                        </li>
                        <li><NavLink to={profileURL} className='py-4 flex items-center'><span className="text-xl text-primary"><FaUserCircle /></span>Profile</NavLink></li>
                        <li><button className='py-4 flex items-center'><span className="text-xl text-primary"><IoSettingsSharp /></span>Settings</button></li>
                        <li><button onClick={handleLogout} className='py-4 flex items-center'><span className="text-xl text-primary"><RiLogoutBoxLine /></span>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar