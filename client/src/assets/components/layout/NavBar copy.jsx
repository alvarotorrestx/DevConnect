import { useContext } from "react";

// Icon Imports
import { IoMdHome } from "react-icons/io";
import { HiNewspaper } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import { GiSuitcase } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

// Context Imports
import ThemeContext from "../../context/ThemeContext";

const NavBar = () => {

    const { darkMode, actions } = useContext(ThemeContext)

    return (
        <div className="navbar bg-base-100 w-[95%] mx-auto rounded-full shadow-md grid grid-cols-2 lg:grid-cols-4 auto-cols-max relative">

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
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><IoMdHome /></span>Home</a></li>
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><HiNewspaper /></span>Blogs</a></li>
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><IoMdPeople /></span>Network</a></li>
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><GiSuitcase /></span>Jobs</a></li>
                    </ul>
                </div>

                {/* DevConnect Link */}
                <a className="btn btn-ghost text-xl rounded-full">DevConnect</a>
            </div>

            {/* Desktop Nav */}
            <div className="navbar-center hidden lg:flex w-[unset] justify-center lg:col-span-2">
                <ul className="menu menu-horizontal px-1">
                    <li><a className="flex items-center"><span className="text-2xl"><IoMdHome /></span>Home</a></li>
                    <li><a className="flex items-center"><span className="text-2xl"><HiNewspaper /></span>Blogs</a></li>
                    <li><a className="flex items-center"><span className="text-2xl"><IoMdPeople /></span>Network</a></li>
                    <li><a className="flex items-center"><span className="text-2xl"><GiSuitcase /></span>Jobs</a></li>
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
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
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
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>

                {/* Profile Avatar and Menu */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            {/* Theme Switcher */}
                            <label className="flex cursor-pointer gap-2">
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
                                {/* Theme Switcher */}
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
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><FaUserCircle /></span>Profile</a></li>
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><IoSettingsSharp /></span>Settings</a></li>
                        <li><a className='py-4 flex items-center'><span className="text-2xl"><RiLogoutBoxLine /></span>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar