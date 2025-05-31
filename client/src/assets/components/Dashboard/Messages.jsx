import React from 'react'

function Messages() {
  return (
    <div>
      <div className="md:flex flex-col md:gap-4 p-3 mb-3 rounded-xl shadow-md bg-base-100 text-content-200 ">
              <div className="first-section flex md:px-2 justify-between mb-3">
                <div className="heading flex justify-between items-center w-full text-center">
                  <h2 className="font-bold md:text-[27px] text-[20px]">Messages</h2>
                  <span class="material-symbols-outlined">edit_square</span>
                </div>
              </div>
              <div className="second-section mx-1 mb-3">
                <input
                  type="text"
                  placeholder="search"
                  className="h-[30px] w-full rounded-sm font-semibold bg-white p-2"
                />
              </div>

              <div className="names flex flex-col">
                <div className="headings flex justify-between w-full sm:flex-wrap  mb-3">
                  <div className="left flex text-[16px] gap-3 ">
                    <div className="text-[16px] font-bold border-b-2 border-black cursor-pointer ">
                      Primary
                    </div>
                    <div className="text-[16px] cursor-pointer ">General</div>
                  </div>
                  <div className="right text-[16px] text-blue-500 font-bold cursor-pointer">
                    FriendReq(4)
                  </div>
                </div>
                <div className="names flex flex-col gap-5">
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50px]"
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="view-button ml-2 flex gap-10">
                    View All
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Messages
