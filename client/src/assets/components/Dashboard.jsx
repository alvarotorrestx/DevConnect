import Carousel from "./Carousel";
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
            <div className="flex flex-col gap-2 border-[15px] border-primary  rounded-xl h-auto align-center">
              <div className="flex align-center text-align w-auto gap-3 p-2 ml-5">
                <div className="image">
                  <img
                    className="w-[60px] h-[60px] rounded-[50px]"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="profile-img"
                  />
                </div>
                <div className="username">
                  <h2 className="text-black-900 font-extrabold text-xl">John David</h2>
                  <h2>@justin098</h2>
                </div>
              </div>

              <div className="flex lg:flex-row gap-2  align-center  mb-2 w-auto ml-5  md:flex-wrap ">
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
            <div className="md:display  md:flex flex-col bg-white border-[12px] rounded-md border-white ">
              <div className="flex gap-2 justify-between w-full items-center mb-3">
                <div className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-blue-800">
                    timeline
                  </span>
                  <div className="font-bold">Activity</div>
                </div>
                <div className="text-blue-800">see All</div>
              </div>
              <div className="md:flex hidden md:display flex-col gap-2">
                <div className="flex gap-2 border border-gray-100 shadow-md p-2">
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

            {/* forums container*/}
            <div className=" md:display  md:flex flex-col bg-[#fff] border-[12px]  border-white rounded-md">
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
                <div className="flex gap-2 border border-gray-100 shadow-md p-2">
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
          <div className="w-full h-40 rounded-md">
            <img
              src="https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg"
              alt="welcome"
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          {/* blog-post-container  */}
          <div className="flex  flex-col md:w-full  rounded-[15px]  bg-white bg-[100px] pt-3 text-center ">

            {/* input field */}
            <div className="w-[90%] grid grid-cols-[0.5fr_4.5fr_1fr] gap-1  mx-5">
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
                  className="rounded-md  w-[100%] bg-[#e0e0e0]  text-center"
                />
              </div>
              <div className="btn btn-primary 
              md:h-[40px]  col-span-1">
                <button className="font-semibold text-[13px] text-black h-[35px]">
                  Share Post
                </button>
              </div>
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
          <div className="m-1 p-4 bg-white rounded-[20px] h-auto">
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
        <div className="md:col-span-1 rounded-md border-2 gap-5">
        

            <div className="message-container md:flex flex-col gap-4  bg-white p-3 mb-3 rounded-xl hidden md:display">
              <div className="first-section flex px-2 justify-between">
                <div className="heading flex justify-between items-center w-full">
                  <h2 className="font-bold text-[27px]">Messages</h2>
                  <span class="material-symbols-outlined">edit_square</span>
                </div>
              </div>
              <div className="second-section mx-2 ">
                <input
                  type="text"
                  placeholder="search"
                  className="h-[30px] w-[200px] rounded-sm font-semibold bg-white"
                />
              </div>

              <div className="names flex flex-col">
                <div className="headings flex justify-between  w-full mb-3">
                  <div className="left flex text-[16px] gap-4">
                    <div className="text-[16px] font-bold border-b-2 border-black cursor-pointer ">
                      Primary
                    </div>
                    <div className="text-[16px] cursor-pointer">General</div>
                  </div>
                  <div className="right text-[16px] text-blue-500 font-semibold cursor-pointer">
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
  
              {/* Events */}

            <div className="md:flex flex-col bg-white  rounded-xl p-4 w-full">
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
                <div className="flex gap-2 border border-gray-100 shadow-md p-2">
                  
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



      </div>
    </div>
  );
};

export default Dashboard;