import Carousel from "./Carousel";
import Activity from "./Activity";
import Messages from "./Messages";
import Events from "./Events";
// import "./styles.css";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-auto">
      {/* <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="mb-6 text-lg">You're logged in successfully 🎉</p>
        </div> */}
      {/* main container */}
      <div className="md:grid w-[95%] h-auto md:grid-cols-4 mt-5 gap-3 mx-auto">
        {/* first column */}
        <div className="col-span-1 ">
          <div className="md:flex md:flex-col md:gap-3  rounded-md hidden">
            {/* profile container */}
            <div className="flex  flex-col gap-2   rounded-xl h-auto align-center   shadow-md bg-base-200 border-[2px]">
              <div className="flex align-center text-align w-auto gap-2 pt-2 ml-5">
                <div className="image w-[45px] h-[45px] flex align-center">
                  <img
                    className="w-full h-full  rounded-full object-cover"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="profile-img"
                  />
                </div>
                <div className="username">
                  <div className="flex gap-1">
                    <h2 className="text-black-900 font-extrabold text-xl">John David</h2>
                    <p>
                      <span className="material-symbols-outlined text-blue-700">
                        verified
                      </span>
                    </p>
                  </div>

                  <h2>@justin098</h2>
                </div>
              </div>

              <div className="flex lg:flex-row gap-5  align-center  mb-2 w-auto ml-5  md:flex-wrap  ">
                <div className="flex flex-col text-center">
                  <div className="font-extrabold">2.3k</div>
                  <div className="">Followers</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className="font-extrabold">890</div>
                  <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className="font-extrabold">80</div>
                  <div>Post</div>
                </div>
              </div>
            </div>

            {/* activity container */}
            <Activity />

            {/* forums container*/}
            <div className="  md:display  md:flex flex-col  rounded-xl bg-base-200 shadow-md p-2 border-[2px]">
              <div className="flex gap-2 justify-between w-full items-center mb-3">
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined   text-blue-800">
                    forum
                  </span>

                  <div className="font-bold">Forums</div>
                </div>
                <div className="text-blue-800">see All</div>
              </div>
              <div className="md:flex hidden md:display flex-col  gap-2">
                <div className="flex gap-2  shadow-md p-2">
                  <div className="left">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                      alt=""
                      className="w-[40px] h-[40px] rounded-[40px]"
                    />
                  </div>
                  <div className="rights flex flex-col">
                    <span className="name font-semibold">Forum 1 Discussion</span>
                    <span className="time text-[12px]">20 people</span>
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
                    <span className="name font-semibold">Forum 2 Discussion</span>
                    <span className="time text-[12px]">70 people</span>
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
                    <span className="name font-semibold">Forum 3 DIscussion</span>
                    <span className="time text-[12px]">50 people</span>
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
                    <span className="name font-semibold">Forum 4 Discussion</span>
                    <span className="time text-[12px]">33 people</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* second column */}
        <div className="md:col-span-2  flex flex-col gap-3 sm:w-full ">

          {/* moblie carousel */}
          <div className="md:hidden block">
            <Carousel />
          </div>

          {/* welcome banner */}
          <div className="w-full h-40 rounded-xl">
            <img
              src="https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg"
              alt="welcome"
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          {/* blog-post-container  */}
          <div className="flex flex-col md:w-full bg-base-200 rounded-xl  shadow-md  bg-[100px] pt-3 text-center border-[2px]  ">

            {/* input field */}
            <div className="w-[90%] grid grid-cols-[0.5fr_4.5fr_1fr] gap-1 mx-5 ">
              <div className="image col-span-0.5">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                  alt="profile"
                  className="aspect-square w-12 sm:w-14 md:w-16 lg:w-20 rounded-full border-2 border-red-700 object-cover"
                />
              </div>
              <div className="input col-span-4.5  bg-[#e0e0e0] md:h-[40px] h-[35px] p-2 w-full">
                <input
                  type="text"
                  placeholder="Whats on your mind?"
                  className="rounded-md  w-[100%] bg-[#e0e0e0]"
                />
              </div>

              <button className="font-semibold text-black bg-primary h-[35px] p-1 col-span-1 text-[12px]  md:h-[40px]   hover:bg-secondary transition duration-300 rounded-md">
                Share Post
              </button>
            </div>

            {/* attachments */}
            <div className="flex gap-5 flex-wrap mt-5 mb-4  mx-5 ">
              <div className="image flex gap-1 items-center">
                <span className="material-symbols-outlined cursor-pointer">
                  attach_file
                </span>
                <div className="cursor-pointer">Attachments</div>
              </div>
              <div className="image flex gap-1 items-center">
                <span className="material-symbols-outlined cursor-pointer">
                  videocam
                </span>
                <div className="cursor-pointer">Live</div>
              </div>
              <div className="image flex gap-1 items-center">
                <span className="material-symbols-outlined cursor-pointer">
                  image
                </span>
                <div className="cursor-pointer">Image</div>
              </div>
              <div className="image flex gap-1 items-center cursor-pointer">
                <span class="material-symbols-outlined">
                  tag
                </span>
                <div className="cursor-pointer">Mention</div>

              </div>
            </div>
          </div>

          {/* blog feed  */}
          <div className="m-1 p-4 rounded-xl h-auto shadow-md bg-base-800 border-[2px] text-content-200 mb-5">
            <div className="blog-container h-auto  flex flex-col gap-[16px] justify-center">
              <div className="blog-top flex gap-[10px] ">
                <div className="image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                    alt=""
                    className="w-[50px] h-[50px] rounded-[50px]"
                  />
                </div>
                <div className="username">
                  <div className="name">
                    <h2 className="font-bold text-[20px]">John David</h2>
                  </div>
                  <div className="time">4:45pm ,Aug 2025</div>
                </div>
              </div>
              <div className="flex items-center justify-center w-auto">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230210161917-01-japan-never-traveler-culture-tokyo.jpg?c=original"
                  alt="post img"
                  className=" h-[250px] md:w-full md:object-cover md:h-[350px] rounded-md"
                />
              </div>
              <div className="blog-extra flex flex-wrap gap-[10px] ">
                <div className="likes flex gap-[5px] justify-center ">
                  <span class="material-symbols-outlined">favorite</span>
                  <div>30 likes</div>
                </div>
                <div className="comments flex  justify-center gap-[5px]">
                  <span class="material-symbols-outlined">chat_bubble</span>
                  <div>12 comments</div>
                </div>
                <div className="share flex justify-center gap-[5px]">
                  <span class="material-symbols-outlined">share</span>
                  <div>Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* third column */}
        <div className="md:col-span-1 rounded-md gap-5">

          {/* message container */}
          <div className="md:block hidden">
            <Messages />
          </div>


          {/* Events */}
          <div className="md:block hidden">
            <Events />
          </div>


        </div>



      </div>
    </div>
  );
};

export default Dashboard;