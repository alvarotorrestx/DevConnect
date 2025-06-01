import React from 'react'

function Events() {
  return (
    <div>
      <div className="md:flex flex-col rounded-xl p-4 w-full shadow-md bg-base-100 text-content-200">
        <div className="flex gap-2 mb-5 justify-between items-center ">
          <div className="flex gap-3 items-center">
            <span className="material-symbols-outlined text-primary">
              calendar_month
            </span>
            <div className="font-bold">Events</div>
          </div>
          <div className="link link-primary link-hover">View All</div>
        </div>


        <div className="flex flex-col gap-2 w-full">

          <div className=" border-gray-100 shadow-md p-2">
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Job Interview</span>
                <span className="time text-[12px]">January 30, 2025</span>
              </div>
              <span className='link link-secondary link-hover text-sm p-2'>View</span>
            </div>
          </div>

          <div className=" border-gray-100 shadow-md p-2">
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Attend Meeting</span>
                <span className="time text-[12px]">March 14, 2025</span>
              </div>
              <span className='link link-secondary link-hover text-sm p-2'>View</span>
            </div>
          </div>

          <div className=" border-gray-100 shadow-md p-2">
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Interview XYZ Company</span>
                <span className="time text-[12px]">June 01, 2025</span>
              </div>
              <span className='link link-secondary link-hover text-sm p-2'>View</span>
            </div>
          </div>

          <div className=" border-gray-100 shadow-md p-2">
            <div className="flex flex-row justify-between items-center w-full flex-wrap">
              <div className='flex flex-col'>
                <span className="name font-semibold">Application Deadline XYZ Company</span>
                <span className="time text-[12px]">July 25, 2025</span>
              </div>
              <span className='link link-secondary link-hover text-sm p-2'>View</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Events
