import React from 'react'

function Events() {
  return (
    <div>
      <div className="md:flex flex-col rounded-xl p-4 w-full shadow-md bg-base-100 text-content-200">
            <div className="flex gap-2 mb-5 justify-between items-center ">
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-blue-800">
                  calendar_month
                </span>
                <div className="font-bold">Events</div>
              </div>
              <div className="text-blue-800">see All</div>
            </div>


            <div className="md:flex md:display flex-col gap-2 w-full">
              <div className="flex gap-2 shadow-md p-2">

                <div className="flex flex-col">
                  <span className="name font-semibold">Job Interview</span>
                  <span className="time text-[12px]">30 -1-25</span>
                </div>
              </div>
              <div className=" border-gray-100 shadow-md p-2">

                <div className="rights flex flex-col">
                  <span className="name font-semibold">Attend Meeting</span>
                  <span className="time text-[12px]">15-02-25</span>
                </div>
              </div>
              <div className=" border-gray-100 shadow-md p-2">

                <div className="flex flex-col">
                  <span className="name font-semibold">Interview XYZ Company</span>
                  <span className="time text-[12px]">20-02-25</span>
                </div>
              </div>
              <div className=" border-gray-100 shadow-md p-2">
                <div className=" flex flex-col">
                  <span className="name font-semibold">Application Deadline XYZ Company</span>
                  <span className="time text-[12px]">30-02-25</span>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Events
