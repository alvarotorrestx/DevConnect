import './styles.css'

const Dashboard = () => {
    return (
      <>
        {/* <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="mb-6 text-lg">You're logged in successfully 🎉</p>
        </div> */}
      
        <div className="main mx-2 flex gap-5">
  
          <div className="first-column flex flex-col gap-19 w-65">
            <div className="p-5 flex flex-col gap-5 border-[15px] border-white rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <div className="image">
                  <img 
                  className='w-[60px] h-[60px] rounded-[50px]'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                   alt="profile-img"  />
                </div>
                <div className="username">
                  <h2 className='text-blue-900 font-bold text-xl'>John David</h2>
                  <h2>@justin098</h2>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>2.3k</div>
                  <div>Followers</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>890</div>
                  <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>80</div>
                  <div>Post</div>
                </div>
              </div>
  
            </div>
            {/* <div className="nav"> */}
              <div className="activity-container flex flex-col bg-white border-[12px] border-white ">
                <div className='flex gap-2 justify-between w-full items-center mb-3'>
                   <div className='flex gap-3 items-center'>
                     <span className="material-symbols-outlined text-blue-800">
                             timeline
                      </span>
                      <div className='font-bold'>
                        Activity 
                      </div>
                   </div>
                   <div className='text-blue-800'>
                        see All
                   </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 border border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                   
                </div>
              </div>
              
            
          </div>
   
          <div 
           className="second-column flex flex-col gap-5">
            <div 
            className="image-container w-[700px] h-[150px] rounded-md">
              <img 
              src="https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg" alt="" className='h-full w-full object-cover rounded-md' /> 
            </div>
            <div className="blog-post-container w-700 h-110 bg-white rounded-[15px] p-1.5">
              <div className="input-field m-2 flex items-center gap-5">
                <div className="image">
                  <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                  className='w-[50px] h-[50px] rounded-[50px]'/>
                </div>
                <div className="input">
                  <input 
                  type="text" placeholder='Whats on your mind?' 
                  className='rounded-md w-[450px] bg-[#e0e0e0]'/>
                </div>
                <div className="post-btn">
                  <button 
                  className='px-2 py-3 font-semibold  bg-blue-600 text-[15px]'>Share Post</button>
                </div>
              </div>
              <div className="attachements flex gap-5 mx-5 mt-5 mb-2">
                <div className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined">
                  attach_file
                  </span>
                  <div>Attachments</div>
                </div>
                <div 
                  className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined">
                  videocam
                </span>
                <div>Live</div>
                </div>
                <div className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined">
                  image
                </span>
                <div>Image</div>
                </div>
                <div className="image flex gap-2 items-center">Mention</div>
              </div>
  
            </div>
            <div className="blog-feed">
              <div className="blog-container">
                <div className="blog-top">
                  <div className="image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                  </div>
                  <div className="username">
                    <div className="name">
                      <h2>Bieber</h2>
                    </div>
                    <div className="time">
                      4:45pm ,Aug 2025
                    </div>
                  </div>
                </div>
                <div className="blog-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                </div>
                <div className="blog-extra">
                  <div className="likes">
                    likes
                  </div>
                  <div className="comments">
                    comments
                  </div>
                  <div className="share">
                    share
                  </div>
                </div>
  
              </div>
            </div>
          </div>
  
          <div className="third-column w-[300px] h-[550px] border-black border-[4px] flex flex-col p-2 rounded-md">
            <div className="message-container flex flex-col gap-4">
              <div className="first-section flex px-2 justify-between">
                <div className="heading flex justify-between items-center w-full">
                  <h2 className='font-bold text-[20px]'>Messages</h2>
                  <span class="material-symbols-outlined">
                     edit_square
                  </span>
                </div>
              </div>
              <div className="second-section mx-2">
                <input type="text" placeholder='search'
                className='h-[30px] rounded-sm' />
              </div>
  
              <div className="names flex flex-col">
                <div className="headings flex justify-between w-full mb-3">
                  <div className="left flex text-[16px] ">
                    <div className='text-[13px] font-bold border-b-2 border-black '>Primary</div>
                    <div className='text-[13px]'>General</div>
                  </div>
                  <div className="right text-[13px] text-blue-500 font-semibold">
                    FriendReq(4)
                  </div>
                </div>
                <div className="names flex flex-col gap-5"> 
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="view-button">
                    View All
                  </div>
                </div>
              </div>
              
  
            </div>
          
  
        </div>
  
      </div>
      </>
    );
};

export default Dashboard;
