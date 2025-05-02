import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import Messages from "./Messages";
import Events from "./Events";

const slides = [
  {
    title: "Profile",
    component: (
      <div className="p-2 mx-2 mt-4 flex flex-col gap-5  rounded-md bg-base-200 w-auto">
        <div className="flex bg-base-200 justify-center gap-[30px] flex-col">
          <div className="left flex justify-center items-center gap-[30px]">
            <img
              className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-full object-cover"
              src="https://i.pravatar.cc/150?img=3"
              alt="profile-img"
            />
            <div>
              <h2 className=" font-bold text-2xl items-center">John David</h2>
              <h2 className="text-xl ">@justin098</h2>
            </div>
          </div>
          <div className="right flex flex-col gap-6 flex-wrap items-center justify-center">
            <div className="flex gap-10">
              {[
                { label: "Followers", value: "2.3k" },
                { label: "Following", value: "890" },
                { label: "Post", value: "80" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-extrabold">{item.value}</div>
                  <div>{item.label}</div>
                </div>
              ))}
            </div>

            <button className="bg-base-200 mb-4 shadow-lg p-1 px-2 rounded-md mt-2">
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Activity",
    component: <Activity />,
  },
  {
    title: "Events",
    component: <Events />,
  },
  {
    title: "Messages",
    component: <Messages />,
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
      newIndex = 0;
    }
    console.log(newIndex)
    setCurrentIndex(newIndex);
  };

  return (
    <div className=" h-[350px] bg-base-200 rounded-md shadow-lg overflow-hidden block lg:hidden border-[1px]  relative">
      <div className="flex absolute left-2 top-[45%]">
        <button
          onClick={() => updateIndex(currentIndex - 1)}
          
        >
          <span className="material-symbols-outlined cursor-pointer">
            chevron_left
          </span>
        </button>
      </div>
      <div className="h-full overflow-y-auto w-full border-[2px] p-5">
        {slides[currentIndex].component}
      </div>
      <div className="absolute right-2 top-[45%]">
        <button
          onClick={() => {
            updateIndex(currentIndex + 1);
          }}
        >
          <span className="material-symbols-outlined cursor-pointer">
            chevron_right
          </span>
        </button>
      </div>

      <div className="flex justify-center mt-3 absolute left-[40%] bottom-2">
        <>
          <div className="indicators">
            {slides.map((item, index) => {
              return (
                <button
                  className={`indicator-buttonsh-3  mx-1 rounded-full transition-all ${
                    index === currentIndex ? "text-red-500" : "text-primary-300"
                  }`}
                  onClick={() => {
                    updateIndex(index);
                  }}
                >
                  <span class="material-symbols-outlined">
                    radio_button_checked
                  </span>
                </button>
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
};

export default Carousel;
