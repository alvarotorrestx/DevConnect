import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";

function Activity() {
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

          <div className="flex gap-2 shadow-md p-2">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                alt=""
                className="w-[45px] rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Alvaro Torres</span>
                <span className="time text-[12px]">Software Engineer</span>
              </div>
              <span className='link link-secondary link-hover text-lg p-2'><IoPersonAddSharp /></span>
            </div>
          </div>

          <div className="flex gap-2 shadow-md p-2">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                alt=""
                className="w-[45px] rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Kami Garces</span>
                <span className="time text-[12px]">Data Analyst</span>
              </div>
              <span className='link link-secondary link-hover text-lg p-2'><IoPersonAddSharp /></span>
            </div>
          </div>

          <div className="flex gap-2 shadow-md p-2">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                alt=""
                className="w-[45px] rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Yasmin Garces</span>
                <span className="time text-[12px]">Lead Software Engineer</span>
              </div>
              <span className='link link-secondary link-hover text-lg p-2'><IoPersonAddSharp /></span>
            </div>
          </div>

          <div className="flex gap-2 shadow-md p-2">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                alt=""
                className="w-[45px] rounded-full"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Roy Campa</span>
                <span className="time text-[12px]">API Genius</span>
              </div>
              <span className='link link-secondary link-hover text-lg p-2'><IoPersonAddSharp /></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Activity
