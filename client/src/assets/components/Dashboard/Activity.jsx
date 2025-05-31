import React from 'react'

function Activity() {
  return (
    <div>
      <div className="bg-base-100 md:flex flex-col p-4 rounded-xl shadow-md sm:w-full">
              <div className="flex gap-2 justify-between w-full items-center mb-3 sm:w-full">
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-blue-800">
                    timeline
                  </span>
                  <div className="font-bold">Activity</div>
                </div>
                <div className="text-blue-800">see All</div>
              </div>
              <div className="md:flex  flex-col gap-2">
                <div className="flex gap-2  shadow-md p-2">
                  <div className="left">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[40px]"
                    />
                  </div>
                  <div className="rights flex flex-col">
                    <span className="name font-semibold">Cipta</span>
                    <span className="time text-[12px]">33 seconds ago</span>
                  </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                  <div className="left">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[40px]"
                    />
                  </div>
                  <div className="rights flex flex-col">
                    <span className="name font-semibold">Cipta</span>
                    <span className="time text-[12px]">33 seconds ago</span>
                  </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                  <div className="left">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[40px]"
                    />
                  </div>
                  <div className="rights flex flex-col">
                    <span className="name font-semibold">Cipta</span>
                    <span className="time text-[12px]">33 seconds ago</span>
                  </div>
                </div>
                <div className="flex gap-2 border-gray-100 shadow-md p-2">
                  <div className="left">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[40px]"
                    />
                  </div>
                  <div className="rights flex flex-col">
                    <span className="name font-semibold">Cipta</span>
                    <span className="time text-[12px]">33 seconds ago</span>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Activity
